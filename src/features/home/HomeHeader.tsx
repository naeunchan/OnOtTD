import { Pressable, StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';

interface HomeHeaderProps {
  nickname: string;
  locationName: string;
  summary: string;
  onOpenSettings: () => void;
}

export function HomeHeader({ nickname, locationName, summary, onOpenSettings }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.textGroup}>
          <Text style={styles.eyebrow}>{locationName}</Text>
          <Text style={styles.title}>{nickname}의 오늘 옷차림</Text>
        </View>
        <Pressable onPress={onOpenSettings}>
          <Text style={styles.settingsLink}>설정</Text>
        </Pressable>
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.s8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.s12,
  },
  textGroup: {
    flex: 1,
    gap: spacing.s4,
  },
  eyebrow: {
    color: appColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    color: appColors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },
  settingsLink: {
    color: appColors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  summary: {
    color: appColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});

