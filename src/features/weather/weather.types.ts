export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy';
export type DustGrade = 'good' | 'normal' | 'bad' | 'very-bad';
export type UvLevel = 'low' | 'moderate' | 'high' | 'very-high';
export type WeatherSource = 'live-current-location' | 'live-default-location' | 'mock-fallback';

export interface WeatherSnapshot {
  locationName: string;
  condition: WeatherCondition;
  temperatureC: number;
  apparentTemperatureC: number;
  dustGrade: DustGrade;
  uvIndex: number;
  uvLevel: UvLevel;
  precipitationChance: number;
  source: WeatherSource;
  sourceMessage: string;
  updatedAt: string;
}
