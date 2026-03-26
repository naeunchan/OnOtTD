import { DEFAULT_WEATHER_MOCK } from '../../shared/mocks/weather.mock';
import type { WeatherRepository } from './weatherRepository';

export const mockWeatherRepository: WeatherRepository = {
  async getTodayWeather() {
    return Promise.resolve({
      ...DEFAULT_WEATHER_MOCK,
      updatedAt: new Date().toISOString(),
    });
  },
};
