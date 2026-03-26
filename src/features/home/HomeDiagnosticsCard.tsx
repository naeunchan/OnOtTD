import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import {
  formatWeatherLocationMode,
  formatWeatherMode,
  formatWeatherModeOverride,
  formatWeatherPermissionState,
  formatUpdatedAt,
} from '../../shared/utils/formatter';
import { Section } from '../../shared/components/Section';
import { WeatherPermissionState } from '../weather/weather.types';
import { WeatherModeOverride, WeatherLocationMode } from '../weather/weatherModeResolver';
import { formatRefreshState, getDiagnosticsHelper, getRefreshHelper } from './homeDiagnostics';
import { HomeRefreshState } from './useHomeViewModel';

interface HomeDiagnosticsCardProps {
  buildTimeWeatherMode: 'live' | 'mock';
  effectiveWeatherMode: 'live' | 'mock';
  locationMode: WeatherLocationMode;
  permissionState: WeatherPermissionState;
  refreshError: string | null;
  refreshState: HomeRefreshState;
  updatedAt: string;
  weatherModeOverride: WeatherModeOverride;
}

export function HomeDiagnosticsCard({
  buildTimeWeatherMode,
  effectiveWeatherMode,
  locationMode,
  permissionState,
  refreshError,
  refreshState,
  updatedAt,
  weatherModeOverride,
}: HomeDiagnosticsCardProps) {
  return (
    <Section
      title="샌드박스 진단"
      description="현재 설정된 테스트 모드와 실제 홈 계산 경로를 한 번에 확인합니다."
    >
      <View style={styles.grid}>
        <DiagnosticItem label="설정 모드" value={formatWeatherModeOverride(weatherModeOverride)} />
        <DiagnosticItem label="빌드 기본값" value={formatWeatherMode(buildTimeWeatherMode)} />
        <DiagnosticItem label="실행 모드" value={formatWeatherMode(effectiveWeatherMode)} />
        <DiagnosticItem label="위치 경로" value={formatWeatherLocationMode(locationMode)} />
        <DiagnosticItem label="권한 상태" value={formatWeatherPermissionState(permissionState)} />
        <DiagnosticItem label="갱신 상태" value={formatRefreshState(refreshState)} />
        <DiagnosticItem label="마지막 기준" value={formatUpdatedAt(updatedAt)} />
      </View>
      <Text style={styles.helper}>{getDiagnosticsHelper(weatherModeOverride, locationMode)}</Text>
      <Text style={styles.helper}>{getRefreshHelper(refreshState, refreshError)}</Text>
    </Section>
  );
}

function DiagnosticItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s12,
  },
  item: {
    width: '48%',
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 18,
    padding: spacing.s12,
    gap: spacing.s4,
  },
  label: {
    color: appColors.textSecondary,
    fontSize: 12,
  },
  value: {
    color: appColors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  helper: {
    color: appColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
