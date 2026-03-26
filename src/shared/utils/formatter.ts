import { DustGrade, UvLevel, WeatherCondition, WeatherSource } from '../../features/weather/weather.types';
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

export function formatUpdatedAt(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return '방금 갱신';
  }

  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');

  return `${hour}:${minute} 기준`;
}
