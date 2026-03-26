export type WeatherMode = 'live' | 'mock';
export type WeatherLocationMode = 'system' | 'default-region';
export type WeatherModeOverride = 'system' | WeatherMode | 'default-region';

export interface ResolvedWeatherExecution {
  weatherMode: WeatherMode;
  locationMode: WeatherLocationMode;
}

export function normalizeWeatherMode(value: string | null | undefined): WeatherMode {
  return value?.toLowerCase() === 'mock' ? 'mock' : 'live';
}

export function normalizeWeatherModeOverride(value: string | null | undefined): WeatherModeOverride {
  const normalized = value?.toLowerCase();

  if (normalized === 'live' || normalized === 'mock' || normalized === 'system' || normalized === 'default-region') {
    return normalized;
  }

  return 'system';
}

export function resolveWeatherExecution(
  overrideMode: WeatherModeOverride,
  buildTimeMode: string | null | undefined
): ResolvedWeatherExecution {
  if (overrideMode === 'mock') {
    return {
      weatherMode: 'mock',
      locationMode: 'system',
    };
  }

  if (overrideMode === 'default-region') {
    return {
      weatherMode: 'live',
      locationMode: 'default-region',
    };
  }

  return {
    weatherMode: overrideMode === 'system' ? normalizeWeatherMode(buildTimeMode) : overrideMode,
    locationMode: 'system',
  };
}
