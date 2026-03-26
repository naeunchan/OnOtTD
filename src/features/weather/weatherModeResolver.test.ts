import { normalizeWeatherMode, normalizeWeatherModeOverride, resolveWeatherMode } from './weatherModeResolver';

describe('weatherModeResolver', () => {
  it('uses the build-time mode when override is system', () => {
    expect(resolveWeatherMode('system', 'live')).toBe('live');
    expect(resolveWeatherMode('system', 'mock')).toBe('mock');
  });

  it('prefers the explicit override mode', () => {
    expect(resolveWeatherMode('live', 'mock')).toBe('live');
    expect(resolveWeatherMode('mock', 'live')).toBe('mock');
  });

  it('normalizes unexpected values safely', () => {
    expect(normalizeWeatherMode('unexpected')).toBe('live');
    expect(normalizeWeatherModeOverride('unexpected')).toBe('system');
  });
});
