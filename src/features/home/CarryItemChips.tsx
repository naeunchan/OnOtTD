import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';

interface CarryItemChipsProps {
  items: string[];
}

export function CarryItemChips({ items }: CarryItemChipsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘 챙길 것</Text>
      <View style={styles.chips}>
        {items.length === 0 ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>추가 준비물 없음</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))
        )}
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
  title: {
    color: appColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s8,
  },
  chip: {
    backgroundColor: appColors.chip,
    borderRadius: 999,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s8,
  },
  chipText: {
    color: appColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
});

