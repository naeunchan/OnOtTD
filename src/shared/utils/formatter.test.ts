import {
  formatWeatherLocationMode,
  formatWeatherModeOverride,
  formatWeatherPermissionState,
  formatWeatherSourceHint,
} from './formatter';

describe('formatWeatherSourceHint', () => {
  it('guides the user to re-enable location permission when using the default region', () => {
    expect(
      formatWeatherSourceHint({
        source: 'live-default-location',
        permissionState: 'denied',
        locationName: '서울 성수동',
      })
    ).toContain('위치 권한을 허용');
  });

  it('guides the user to retry live weather when mock fallback is shown', () => {
    expect(
      formatWeatherSourceHint({
        source: 'mock-fallback',
        permissionState: 'unknown',
        locationName: '서울 성수동',
      })
    ).toContain('실시간 날씨 다시 시도');
  });

  it('formats weather diagnostics labels', () => {
    expect(formatWeatherModeOverride('default-region')).toBe('기본 지역 실황 강제');
    expect(formatWeatherLocationMode('default-region')).toBe('기본 지역 강제');
    expect(formatWeatherPermissionState('unknown')).toBe('확인 불가');
  });
});
