import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';

interface SectionProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description == null ? null : <Text style={styles.description}>{description}</Text>}
      <View style={styles.content}>{children}</View>
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
  description: {
    color: appColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    gap: spacing.s12,
  },
});

