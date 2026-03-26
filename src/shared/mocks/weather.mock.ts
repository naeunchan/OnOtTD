import { WeatherSnapshot } from '../../features/weather/weather.types';

export const DEFAULT_WEATHER_MOCK: WeatherSnapshot = {
  locationName: '서울 성수동',
  condition: 'sunny',
  temperatureC: 13,
  apparentTemperatureC: 11,
  dustGrade: 'bad',
  uvIndex: 6,
  uvLevel: 'high',
  precipitationChance: 10,
  source: 'mock-fallback',
  permissionState: 'unknown',
  sourceMessage: '실시간 날씨를 가져오지 못해 mock 데이터로 보여주고 있어요.',
  updatedAt: new Date('2026-03-25T08:00:00+09:00').toISOString(),
};
