import { DEFAULT_WEATHER_MOCK } from '../../shared/mocks/weather.mock';
import type { WeatherRepository } from './weatherRepository';

export const mockWeatherRepository: WeatherRepository = {
  async getTodayWeather() {
    return Promise.resolve({
      ...DEFAULT_WEATHER_MOCK,
      sourceMessage: '실시간 날씨를 가져오지 못해 mock 데이터로 보여주고 있어요.',
      updatedAt: new Date().toISOString(),
    });
  },
};
