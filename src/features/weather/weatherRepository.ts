import { liveWeatherRepository } from './liveWeatherRepository';
import { mockWeatherRepository } from './mockWeatherRepository';
import { resolveWeatherMode, normalizeWeatherMode } from './weatherModeResolver';
import { getWeatherModeOverride } from './weatherModeStorage';
import { WeatherSnapshot } from './weather.types';

export interface WeatherRepository {
  getTodayWeather(): Promise<WeatherSnapshot>;
}

export const buildTimeWeatherMode = normalizeWeatherMode(import.meta.env.ONOTTD_WEATHER_MODE);

export const weatherRepository: WeatherRepository = {
  async getTodayWeather() {
    const overrideMode = await getWeatherModeOverride();
    const weatherMode = resolveWeatherMode(overrideMode, buildTimeWeatherMode);

    return weatherMode === 'mock' ? mockWeatherRepository.getTodayWeather() : liveWeatherRepository.getTodayWeather();
  },
};
