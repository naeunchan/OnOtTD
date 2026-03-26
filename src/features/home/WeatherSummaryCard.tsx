import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { formatDustGrade, formatUvLevel, formatWeatherCondition } from '../../shared/utils/formatter';
import { WeatherSnapshot } from '../weather/weather.types';

interface WeatherSummaryCardProps {
  weather: WeatherSnapshot;
}

export function WeatherSummaryCard({ weather }: WeatherSummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘 환경</Text>
      <View style={styles.grid}>
        <InfoItem label="날씨" value={formatWeatherCondition(weather.condition)} />
        <InfoItem label="기온" value={`${weather.temperatureC}°C`} />
        <InfoItem label="체감" value={`${weather.apparentTemperatureC}°C`} />
        <InfoItem label="미세먼지" value={formatDustGrade(weather.dustGrade)} />
        <InfoItem label="자외선" value={`${formatUvLevel(weather.uvLevel)} (${weather.uvIndex})`} />
        <InfoItem label="강수확률" value={`${weather.precipitationChance}%`} />
      </View>
    </View>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: appColors.border,
    padding: spacing.s16,
    gap: spacing.s12,
  },
  title: {
    color: appColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s12,
  },
  item: {
    width: '47%',
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 18,
    padding: spacing.s12,
    gap: spacing.s4,
  },
  itemLabel: {
    color: appColors.textSecondary,
    fontSize: 13,
  },
  itemValue: {
    color: appColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});

