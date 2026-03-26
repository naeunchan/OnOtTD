import { normalizeWeatherMode, normalizeWeatherModeOverride, resolveWeatherExecution } from './weatherModeResolver';

describe('weatherModeResolver', () => {
  it('uses the build-time mode when override is system', () => {
    expect(resolveWeatherExecution('system', 'live')).toEqual({
      weatherMode: 'live',
      locationMode: 'system',
    });
    expect(resolveWeatherExecution('system', 'mock')).toEqual({
      weatherMode: 'mock',
      locationMode: 'system',
    });
  });

  it('prefers the explicit override mode', () => {
    expect(resolveWeatherExecution('live', 'mock')).toEqual({
      weatherMode: 'live',
      locationMode: 'system',
    });
    expect(resolveWeatherExecution('mock', 'live')).toEqual({
      weatherMode: 'mock',
      locationMode: 'system',
    });
  });

  it('supports forcing the default region live path', () => {
    expect(resolveWeatherExecution('default-region', 'live')).toEqual({
      weatherMode: 'live',
      locationMode: 'default-region',
    });
  });

  it('normalizes unexpected values safely', () => {
    expect(normalizeWeatherMode('unexpected')).toBe('live');
    expect(normalizeWeatherModeOverride('unexpected')).toBe('system');
  });
});
