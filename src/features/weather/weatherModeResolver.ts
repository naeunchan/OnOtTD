export type WeatherMode = 'live' | 'mock';
export type WeatherModeOverride = 'system' | WeatherMode;

export function normalizeWeatherMode(value: string | null | undefined): WeatherMode {
  return value?.toLowerCase() === 'mock' ? 'mock' : 'live';
}

export function normalizeWeatherModeOverride(value: string | null | undefined): WeatherModeOverride {
  const normalized = value?.toLowerCase();

  if (normalized === 'live' || normalized === 'mock' || normalized === 'system') {
    return normalized;
  }

  return 'system';
}

export function resolveWeatherMode(overrideMode: WeatherModeOverride, buildTimeMode: string | null | undefined): WeatherMode {
  return overrideMode === 'system' ? normalizeWeatherMode(buildTimeMode) : overrideMode;
}
