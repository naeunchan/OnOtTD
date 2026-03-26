import { DEFAULT_WEATHER_MOCK } from '../../shared/mocks/weather.mock';
import { DustGrade, UvLevel, WeatherCondition } from './weather.types';

export function mapWeatherCodeToCondition(weatherCode: number | undefined): WeatherCondition {
  if (weatherCode == null) {
    return DEFAULT_WEATHER_MOCK.condition;
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return 'snowy';
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
    return 'rainy';
  }

  if ([1, 2, 3, 45, 48].includes(weatherCode)) {
    return 'cloudy';
  }

  return 'sunny';
}

export function mapPm10ToDustGrade(pm10: number | undefined, europeanAqi?: number): DustGrade {
  if (pm10 != null) {
    if (pm10 <= 30) {
      return 'good';
    }

    if (pm10 <= 80) {
      return 'normal';
    }

    if (pm10 <= 150) {
      return 'bad';
    }

    return 'very-bad';
  }

  if (europeanAqi == null) {
    return DEFAULT_WEATHER_MOCK.dustGrade;
  }

  if (europeanAqi <= 20) {
    return 'good';
  }

  if (europeanAqi <= 60) {
    return 'normal';
  }

  if (europeanAqi <= 100) {
    return 'bad';
  }

  return 'very-bad';
}

export function mapUvIndexToLevel(uvIndex: number | undefined): UvLevel {
  if (uvIndex == null || uvIndex < 3) {
    return 'low';
  }

  if (uvIndex < 6) {
    return 'moderate';
  }

  if (uvIndex < 8) {
    return 'high';
  }

  return 'very-high';
}

