import {
  DustGrade,
  UvLevel,
  WeatherCondition,
  WeatherPermissionState,
  WeatherSource,
} from '../../features/weather/weather.types';
import { WeatherMode, WeatherModeOverride, WeatherLocationMode } from '../../features/weather/weatherModeResolver';
import { PersonalColorTone, TempSensitivity, UsagePurpose } from '../types/profile';

export function formatWeatherCondition(condition: WeatherCondition) {
  const labels: Record<WeatherCondition, string> = {
    cloudy: '흐림',
    rainy: '비',
    snowy: '눈',
    sunny: '맑음',
  };

  return labels[condition];
}

export function formatDustGrade(grade: DustGrade) {
  const labels: Record<DustGrade, string> = {
    good: '좋음',
    normal: '보통',
    bad: '나쁨',
    'very-bad': '매우 나쁨',
  };

  return labels[grade];
}

export function formatUvLevel(level: UvLevel) {
  const labels: Record<UvLevel, string> = {
    low: '낮음',
    moderate: '보통',
    high: '높음',
    'very-high': '매우 높음',
  };

  return labels[level];
}

export function formatUsagePurpose(value: UsagePurpose) {
  const labels: Record<UsagePurpose, string> = {
    commute: '출퇴근',
    office: '실내 근무',
    outdoor: '야외 일정',
  };

  return labels[value];
}

export function formatSensitivity(value: TempSensitivity) {
  const labels: Record<TempSensitivity, string> = {
    'cold-sensitive': '추위를 많이 타는 편',
    balanced: '보통 체감',
    'heat-sensitive': '더위를 많이 타는 편',
  };

  return labels[value];
}

export function formatPersonalColorTone(value: PersonalColorTone) {
  const labels: Record<PersonalColorTone, string> = {
    autumn: '가을 웜',
    spring: '봄 웜',
    summer: '여름 쿨',
    unknown: '미입력',
    winter: '겨울 쿨',
  };

  return labels[value];
}

export function formatWeatherSource(source: WeatherSource) {
  const labels: Record<WeatherSource, string> = {
    'live-current-location': '현재 위치 실황',
    'live-default-location': '기본 지역 실황',
    'mock-fallback': 'mock 폴백',
  };

  return labels[source];
}

export function formatWeatherMode(mode: WeatherMode) {
  return mode === 'mock' ? 'mock 데이터' : '실시간 날씨';
}

export function formatWeatherModeOverride(mode: WeatherModeOverride) {
  const labels: Record<WeatherModeOverride, string> = {
    system: '빌드 기본값',
    live: '실시간 날씨 강제',
    'default-region': '기본 지역 실황 강제',
    mock: 'mock 데이터 강제',
  };

  return labels[mode];
}

export function formatWeatherLocationMode(mode: WeatherLocationMode) {
  const labels: Record<WeatherLocationMode, string> = {
    system: '기본 동작',
    'default-region': '기본 지역 강제',
  };

  return labels[mode];
}

export function formatWeatherPermissionState(state: WeatherPermissionState) {
  const labels: Record<WeatherPermissionState, string> = {
    granted: '허용',
    denied: '거부',
    unknown: '확인 불가',
  };

  return labels[state];
}

export function formatWeatherSourceHint({
  locationName,
  permissionState,
  source,
}: {
  locationName: string;
  permissionState: WeatherPermissionState;
  source: WeatherSource;
}) {
  if (source === 'mock-fallback') {
    return '네트워크 상태를 확인한 뒤 실시간 날씨 다시 시도를 눌러보세요.';
  }

  if (source === 'live-current-location') {
    return '현재 위치가 바뀌었으면 아래 버튼으로 다시 불러오세요.';
  }

  if (permissionState === 'denied') {
    return `설정에서 위치 권한을 허용하면 ${locationName} 대신 현재 위치 기준으로 바뀌어요.`;
  }

  return `${locationName} 기준 결과를 먼저 보여주고 있어요.`;
}

export function formatUpdatedAt(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return '방금 갱신';
  }

  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');

  return `${hour}:${minute} 기준`;
}
