import { Radio } from '@toss/tds-react-native';
import { StyleSheet, Text } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { Section } from '../../shared/components/Section';
import { buildTimeWeatherMode } from '../weather/weatherRepository';
import { WeatherMode, WeatherModeOverride, resolveWeatherExecution } from '../weather/weatherModeResolver';

interface SandboxWeatherModeCardProps {
  value: WeatherModeOverride;
  onChange: (next: WeatherModeOverride) => void;
}

export function SandboxWeatherModeCard({ value, onChange }: SandboxWeatherModeCardProps) {
  const execution = resolveWeatherExecution(value, buildTimeWeatherMode);

  return (
    <Section
      title="샌드박스 날씨 모드"
      description="실기기 QA에서 실시간, 기본 지역, mock 폴백 경로를 강제로 재현할 수 있습니다."
    >
      <Radio<WeatherModeOverride> value={value} onChange={onChange}>
        <Radio.Option value="system">{`빌드 기본값 사용 (${formatWeatherMode(buildTimeWeatherMode)})`}</Radio.Option>
        <Radio.Option value="live">실시간 날씨 강제</Radio.Option>
        <Radio.Option value="default-region">기본 지역 실황 강제</Radio.Option>
        <Radio.Option value="mock">mock 데이터 강제</Radio.Option>
      </Radio>
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

const styles = StyleSheet.create({
  summary: {
    color: appColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
