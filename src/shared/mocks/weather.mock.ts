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
};

