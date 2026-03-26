import { Button, Radio } from '@toss/tds-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Section } from '../../shared/components/Section';
import { buildTimeWeatherMode } from '../weather/weatherRepository';
import { WeatherMode, WeatherModeOverride, resolveWeatherExecution } from '../weather/weatherModeResolver';

interface SandboxWeatherModeCardProps {
  savedValue: WeatherModeOverride;
  value: WeatherModeOverride;
  onChange: (next: WeatherModeOverride) => void;
}

export function SandboxWeatherModeCard({ savedValue, value, onChange }: SandboxWeatherModeCardProps) {
  const execution = resolveWeatherExecution(value, buildTimeWeatherMode);
  const isDirty = savedValue !== value;

  return (
    <Section
      title="샌드박스 날씨 모드"
      description="실기기 QA에서 실시간, 기본 지역, mock 폴백 경로를 강제로 재현할 수 있습니다."
    >
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>{`저장된 값: ${formatWeatherModeLabel(savedValue)}`}</Text>
        <Text style={styles.statusLabel}>{`현재 선택: ${formatWeatherModeLabel(value)}`}</Text>
        <Text style={[styles.statusHelper, isDirty ? styles.statusHelperWarning : null]}>
          {isDirty
            ? '아직 저장되지 않은 선택이 있습니다. 저장하고 홈으로 이동해야 실제 홈 계산에 반영됩니다.'
            : '현재 선택과 저장된 값이 같습니다.'}
        </Text>
      </View>
      <Radio<WeatherModeOverride> value={value} onChange={onChange}>
        <Radio.Option value="system">{`빌드 기본값 사용 (${formatWeatherMode(buildTimeWeatherMode)})`}</Radio.Option>
        <Radio.Option value="live">실시간 날씨 강제</Radio.Option>
        <Radio.Option value="default-region">기본 지역 실황 강제</Radio.Option>
        <Radio.Option value="mock">mock 데이터 강제</Radio.Option>
      </Radio>
      <View style={styles.actions}>
        <Button onPress={() => onChange('system')} style="weak" type="dark">
          빌드 기본값으로 되돌리기
        </Button>
      </View>
      <Text style={styles.summary}>{getModeSummary(value, execution.weatherMode)}</Text>
    </Section>
  );
}

function getModeSummary(value: WeatherModeOverride, effectiveMode: WeatherMode) {
  if (value === 'system') {
    return `현재 빌드 기본값은 ${formatWeatherMode(buildTimeWeatherMode)}입니다. 저장하고 홈으로 이동한 뒤 새로고침하면 반영됩니다.`;
  }

  if (value === 'default-region') {
    return '저장하고 홈으로 이동하면 위치 권한과 무관하게 기본 지역 실황 카드가 보입니다.';
  }

  return `저장하고 홈으로 이동하면 ${formatWeatherMode(effectiveMode)} 경로로 다시 계산합니다.`;
}

function formatWeatherMode(value: WeatherMode) {
  return value === 'mock' ? 'mock 데이터' : '실시간 날씨';
}

function formatWeatherModeLabel(value: WeatherModeOverride) {
  if (value === 'system') {
    return `빌드 기본값 (${formatWeatherMode(buildTimeWeatherMode)})`;
  }

  if (value === 'default-region') {
    return '기본 지역 실황 강제';
  }

  return value === 'mock' ? 'mock 데이터 강제' : '실시간 날씨 강제';
}

const styles = StyleSheet.create({
  statusBox: {
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 18,
    padding: spacing.s12,
    gap: spacing.s8,
  },
  statusLabel: {
    color: appColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  statusHelper: {
    color: appColors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  statusHelperWarning: {
    color: appColors.warning,
  },
  actions: {
    gap: spacing.s8,
  },
  summary: {
    color: appColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
