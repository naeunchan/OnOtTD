import { liveWeatherRepository } from './liveWeatherRepository';
import { mockWeatherRepository } from './mockWeatherRepository';
import { resolveWeatherExecution, normalizeWeatherMode } from './weatherModeResolver';
import { getWeatherModeOverride } from './weatherModeStorage';
import { WeatherSnapshot } from './weather.types';

export interface WeatherRequestOptions {
  locationMode?: 'system' | 'default-region';
}

export interface WeatherRepository {
  getTodayWeather(options?: WeatherRequestOptions): Promise<WeatherSnapshot>;
}

export const buildTimeWeatherMode = normalizeWeatherMode(import.meta.env.ONOTTD_WEATHER_MODE);

export const weatherRepository: WeatherRepository = {
  async getTodayWeather() {
    const overrideMode = await getWeatherModeOverride();
    const execution = resolveWeatherExecution(overrideMode, buildTimeWeatherMode);

    return execution.weatherMode === 'mock'
      ? mockWeatherRepository.getTodayWeather()
      : liveWeatherRepository.getTodayWeather({ locationMode: execution.locationMode });
  },
};
