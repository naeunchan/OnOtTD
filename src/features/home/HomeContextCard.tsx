import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import {
  formatPersonalColorTone,
  formatSensitivity,
  formatUpdatedAt,
  formatUsagePurpose,
  formatWeatherSource,
} from '../../shared/utils/formatter';
import { UserProfile } from '../../shared/types/profile';
import { WeatherSnapshot } from '../weather/weather.types';

interface HomeContextCardProps {
  profile: UserProfile;
  weather: WeatherSnapshot;
}

export function HomeContextCard({ profile, weather }: HomeContextCardProps) {
  const profileItems = [
    formatSensitivity(profile.tempSensitivity),
    formatUsagePurpose(profile.usagePurpose),
    formatPersonalColorTone(profile.personalColorTone),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatWeatherSource(weather.source)}</Text>
        </View>
        <Text style={styles.updatedAt}>{formatUpdatedAt(weather.updatedAt)}</Text>
      </View>

      <Text style={styles.message}>{weather.sourceMessage}</Text>

      <View style={styles.chips}>
        {profileItems.map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.s12,
  },
  badge: {
    backgroundColor: appColors.primarySoft,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    borderRadius: 999,
  },
  badgeText: {
    color: appColors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  updatedAt: {
    color: appColors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
  },
  message: {
    color: appColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s8,
  },
  chip: {
    backgroundColor: appColors.chip,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
    borderRadius: 999,
  },
  chipText: {
    color: appColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
});
