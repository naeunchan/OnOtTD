import { WeatherModeOverride, WeatherLocationMode } from '../weather/weatherModeResolver';
import { HomeRefreshState } from './useHomeViewModel';

export function getHomeReloadLabel({
  hasFallbackWeather,
  usesDefaultLocationWeather,
}: {
  hasFallbackWeather: boolean;
  usesDefaultLocationWeather: boolean;
}) {
  if (hasFallbackWeather) {
    return '실시간 날씨 다시 시도';
  }

  if (usesDefaultLocationWeather) {
    return '현재 위치 기준으로 다시 확인';
  }

  return '실시간 날씨 다시 불러오기';
}

export function getDiagnosticsHelper(weatherModeOverride: WeatherModeOverride, locationMode: WeatherLocationMode) {
  if (weatherModeOverride === 'mock') {
    return '현재는 mock 데이터 강제 모드입니다. 네트워크와 권한 상태와 무관하게 mock 폴백 UI를 확인할 수 있습니다.';
  }

  if (locationMode === 'default-region') {
    return '현재는 기본 지역 실황 강제 모드입니다. 위치 권한을 바꾸지 않아도 권한 거부 흐름을 바로 점검할 수 있습니다.';
  }

  if (weatherModeOverride === 'live') {
    return '현재는 실시간 날씨 강제 모드입니다. 설정에서 system으로 돌리면 빌드 기본값을 다시 따릅니다.';
  }

  return '현재는 빌드 기본값을 따르는 상태입니다. 설정에서 테스트 모드를 바꾸면 홈 결과가 즉시 달라집니다.';
}

export function formatRefreshState(refreshState: HomeRefreshState) {
  const labels: Record<HomeRefreshState, string> = {
    'initial-loading': '초기 로드 중',
    refreshing: '다시 불러오는 중',
    ready: '최신 상태',
    'refresh-error': '마지막 갱신 실패',
  };

  return labels[refreshState];
}

export function getRefreshHelper(refreshState: HomeRefreshState, refreshError: string | null) {
  if (refreshState === 'initial-loading') {
    return '첫 홈 진입 시 필요한 프로필과 날씨를 가져오는 중입니다.';
  }

  if (refreshState === 'refreshing') {
    return '현재 날씨와 추천 결과를 다시 계산하고 있습니다.';
  }

  if (refreshState === 'refresh-error') {
    return refreshError == null
      ? '마지막 새로고침에 실패해 이전 결과를 유지하고 있습니다.'
      : `마지막 새로고침에 실패해 이전 결과를 유지하고 있습니다. ${refreshError}`;
  }

  return '가장 최근에 성공한 결과를 기준으로 홈 화면을 보여주고 있습니다.';
}
