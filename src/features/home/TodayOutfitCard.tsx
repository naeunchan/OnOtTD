import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { RecommendationResult } from '../recommendation/recommendation.types';

interface TodayOutfitCardProps {
  recommendation: RecommendationResult;
}

export function TodayOutfitCard({ recommendation }: TodayOutfitCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 추천</Text>
      <Text style={styles.summary}>{recommendation.summary}</Text>

      <View style={styles.outfitList}>
        <OutfitRow label="상의" value={recommendation.top} />
        <OutfitRow label="아우터" value={recommendation.outer ?? '생략'} />
        <OutfitRow label="하의" value={recommendation.bottom} />
        <OutfitRow label="신발" value={recommendation.shoes} />
      </View>

      <View style={styles.reasonBox}>
        {recommendation.reasonLines.map((line) => (
          <Text key={line} style={styles.reasonText}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

function OutfitRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
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
  summary: {
    color: appColors.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  outfitList: {
    gap: spacing.s8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.s12,
    paddingVertical: spacing.s4,
  },
  rowLabel: {
    color: appColors.textSecondary,
    fontSize: 14,
  },
  rowValue: {
    flex: 1,
    color: appColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  reasonBox: {
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 18,
    padding: spacing.s12,
    gap: spacing.s8,
  },
  reasonText: {
    color: appColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});

