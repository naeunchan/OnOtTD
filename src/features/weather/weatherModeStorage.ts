import { getString, removeString, setString } from '../../shared/storage/appStorage';
import { storageKeys } from '../../shared/storage/storageKeys';
import { WeatherModeOverride, normalizeWeatherModeOverride } from './weatherModeResolver';

export async function getWeatherModeOverride(): Promise<WeatherModeOverride> {
  const storedValue = await getString(storageKeys.weatherModeOverride);
  return normalizeWeatherModeOverride(storedValue);
}

export async function saveWeatherModeOverride(mode: WeatherModeOverride): Promise<WeatherModeOverride> {
  if (mode === 'system') {
    await removeString(storageKeys.weatherModeOverride);
    return 'system';
  }

  await setString(storageKeys.weatherModeOverride, mode);
  return mode;
}

export async function resetWeatherModeOverride() {
  await removeString(storageKeys.weatherModeOverride);
}
