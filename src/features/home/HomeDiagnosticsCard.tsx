import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import {
  formatWeatherLocationMode,
  formatWeatherMode,
  formatWeatherModeOverride,
  formatWeatherPermissionState,
} from '../../shared/utils/formatter';
import { Section } from '../../shared/components/Section';
import { WeatherPermissionState } from '../weather/weather.types';
import { WeatherModeOverride, WeatherLocationMode } from '../weather/weatherModeResolver';

interface HomeDiagnosticsCardProps {
  buildTimeWeatherMode: 'live' | 'mock';
  effectiveWeatherMode: 'live' | 'mock';
  locationMode: WeatherLocationMode;
  permissionState: WeatherPermissionState;
  weatherModeOverride: WeatherModeOverride;
}

export function HomeDiagnosticsCard({
  buildTimeWeatherMode,
  effectiveWeatherMode,
  locationMode,
  permissionState,
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
      </View>
      <Text style={styles.helper}>{getDiagnosticsHelper(weatherModeOverride, locationMode)}</Text>
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

function getDiagnosticsHelper(weatherModeOverride: WeatherModeOverride, locationMode: WeatherLocationMode) {
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
