import { liveWeatherRepository } from './liveWeatherRepository';
import { mockWeatherRepository } from './mockWeatherRepository';
import { WeatherSnapshot } from './weather.types';

export interface WeatherRepository {
  getTodayWeather(): Promise<WeatherSnapshot>;
}

const weatherMode = (import.meta.env.ONOTTD_WEATHER_MODE ?? 'live').toLowerCase();

export const weatherRepository: WeatherRepository =
  weatherMode === 'mock' ? mockWeatherRepository : liveWeatherRepository;
