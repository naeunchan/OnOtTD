import {
  formatRefreshState,
  getDiagnosticsHelper,
  getHomeReloadLabel,
  getRefreshHelper,
} from './homeDiagnostics';

describe('homeDiagnostics', () => {
  it('selects the reload label for fallback weather first', () => {
    expect(
      getHomeReloadLabel({
        hasFallbackWeather: true,
        usesDefaultLocationWeather: false,
      })
    ).toBe('실시간 날씨 다시 시도');
  });

  it('selects the reload label for default location weather', () => {
    expect(
      getHomeReloadLabel({
        hasFallbackWeather: false,
        usesDefaultLocationWeather: true,
      })
    ).toBe('현재 위치 기준으로 다시 확인');
  });

  it('formats refresh state labels', () => {
    expect(formatRefreshState('refresh-error')).toBe('마지막 갱신 실패');
  });

  it('describes forced default-region diagnostics', () => {
    expect(getDiagnosticsHelper('default-region', 'default-region')).toContain('기본 지역 실황 강제');
  });

  it('includes the last refresh error in the helper text', () => {
    expect(getRefreshHelper('refresh-error', 'network timeout')).toContain('network timeout');
  });
});
