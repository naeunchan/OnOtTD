import { Accuracy, getCurrentLocation } from '@apps-in-toss/framework';
import { DEFAULT_WEATHER_MOCK } from '../../shared/mocks/weather.mock';
import { mockWeatherRepository } from './mockWeatherRepository';
import { mapPm10ToDustGrade, mapUvIndexToLevel, mapWeatherCodeToCondition } from './liveWeatherMapper';
import type { WeatherRepository } from './weatherRepository';
import { WeatherSnapshot, WeatherSource } from './weather.types';

interface ForecastCurrentResponse {
  current?: {
    apparent_temperature?: number;
    precipitation_probability?: number;
    temperature_2m?: number;
    weather_code?: number;
  };
}

interface AirQualityCurrentResponse {
  current?: {
    european_aqi?: number;
    pm10?: number;
    uv_index?: number;
  };
}

interface ResolvedLocation {
  latitude: number;
  longitude: number;
  locationName: string;
  source: Extract<WeatherSource, 'live-current-location' | 'live-default-location'>;
  sourceMessage: string;
}

const DEFAULT_LOCATION: ResolvedLocation = {
  latitude: readNumberEnv('ONOTTD_DEFAULT_LATITUDE', 37.5447),
  longitude: readNumberEnv('ONOTTD_DEFAULT_LONGITUDE', 127.0561),
  locationName: import.meta.env.ONOTTD_DEFAULT_LOCATION_NAME ?? '서울 성수동',
  source: 'live-default-location',
  sourceMessage: '위치 권한 없이 기본 지역 기준 실날씨를 보여줘요.',
};

const WEATHER_API_URL = import.meta.env.ONOTTD_OPEN_METEO_WEATHER_URL ?? 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_API_URL =
  import.meta.env.ONOTTD_OPEN_METEO_AIR_QUALITY_URL ?? 'https://air-quality-api.open-meteo.com/v1/air-quality';

export const liveWeatherRepository: WeatherRepository = {
  async getTodayWeather() {
    try {
      const location = await resolveLocation();
      const [forecast, airQuality] = await Promise.all([
        fetchJson<ForecastCurrentResponse>(buildForecastUrl(location)),
        fetchJson<AirQualityCurrentResponse>(buildAirQualityUrl(location)),
      ]);

      return buildWeatherSnapshot(location, forecast, airQuality);
    } catch (error) {
      console.warn('Live weather request failed. Falling back to mock weather.', error);
      return mockWeatherRepository.getTodayWeather();
    }
  },
};

async function resolveLocation(): Promise<ResolvedLocation> {
  try {
    const permissionStatus = await getLocationPermissionStatus();

    if (permissionStatus == null || isPermissionGranted(permissionStatus) === false) {
      return DEFAULT_LOCATION;
    }

    const location = await getCurrentLocation({ accuracy: Accuracy.Balanced });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      locationName: '현재 위치',
      source: 'live-current-location',
      sourceMessage: '현재 위치 기준 실날씨를 반영했어요.',
    };
  } catch (error) {
    console.warn('Current location is unavailable. Falling back to default location.', error);
    return DEFAULT_LOCATION;
  }
}

async function getLocationPermissionStatus() {
  const permissionAwareLocation = getCurrentLocation as typeof getCurrentLocation & {
    getPermission?: () => Promise<unknown>;
  };

  if (typeof permissionAwareLocation.getPermission !== 'function') {
    return null;
  }

  const permission = await permissionAwareLocation.getPermission();
  return typeof permission === 'string' ? permission : String(permission);
}

function isPermissionGranted(permission: string) {
  const normalized = permission.toLowerCase();
  return normalized.includes('grant') || normalized.includes('allow') || normalized.includes('authoriz');
}

function buildForecastUrl(location: ResolvedLocation) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,apparent_temperature,weather_code,precipitation_probability',
    timezone: 'auto',
    forecast_days: '1',
  });

  return `${WEATHER_API_URL}?${params.toString()}`;
}

function buildAirQualityUrl(location: ResolvedLocation) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'pm10,european_aqi,uv_index',
    timezone: 'auto',
    forecast_days: '1',
  });

  return `${AIR_QUALITY_API_URL}?${params.toString()}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (response.ok === false) {
    throw new Error(`Weather API request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

function buildWeatherSnapshot(
  location: ResolvedLocation,
  forecast: ForecastCurrentResponse,
  airQuality: AirQualityCurrentResponse
): WeatherSnapshot {
  const currentForecast = forecast.current ?? {};
  const currentAirQuality = airQuality.current ?? {};
  const uvIndex = roundValue(currentAirQuality.uv_index, DEFAULT_WEATHER_MOCK.uvIndex);

  return {
    locationName: location.locationName,
    condition: mapWeatherCodeToCondition(currentForecast.weather_code),
    temperatureC: roundValue(currentForecast.temperature_2m, DEFAULT_WEATHER_MOCK.temperatureC),
    apparentTemperatureC: roundValue(currentForecast.apparent_temperature, DEFAULT_WEATHER_MOCK.apparentTemperatureC),
    dustGrade: mapPm10ToDustGrade(currentAirQuality.pm10, currentAirQuality.european_aqi),
    uvIndex,
    uvLevel: mapUvIndexToLevel(uvIndex),
    precipitationChance: roundValue(
      currentForecast.precipitation_probability,
      DEFAULT_WEATHER_MOCK.precipitationChance
    ),
    source: location.source,
    sourceMessage: location.sourceMessage,
    updatedAt: new Date().toISOString(),
  };
}

function roundValue(value: number | undefined, fallback: number) {
  return value == null || Number.isNaN(value) ? fallback : Math.round(value);
}

function readNumberEnv(key: keyof ImportMeta['env'], fallback: number) {
  const rawValue = import.meta.env[key];
  const parsed = rawValue == null ? Number.NaN : Number(rawValue);
  return Number.isFinite(parsed) ? parsed : fallback;
}
