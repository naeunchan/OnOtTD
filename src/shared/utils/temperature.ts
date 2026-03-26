import { TempSensitivity } from '../types/profile';

const sensitivityBias: Record<TempSensitivity, number> = {
  'cold-sensitive': -3,
  balanced: 0,
  'heat-sensitive': 3,
};

export function getEffectiveTemperature(apparentTemperatureC: number, sensitivity: TempSensitivity) {
  return apparentTemperatureC + sensitivityBias[sensitivity];
}

export function getTemperatureBand(effectiveTemperatureC: number) {
  if (effectiveTemperatureC <= 4) {
    return 'freezing';
  }

  if (effectiveTemperatureC <= 11) {
    return 'cold';
  }

  if (effectiveTemperatureC <= 19) {
    return 'mild';
  }

  if (effectiveTemperatureC <= 26) {
    return 'warm';
  }

  return 'hot';
}

