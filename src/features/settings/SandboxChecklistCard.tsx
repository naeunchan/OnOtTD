import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Section } from '../../shared/components/Section';
import { sandboxChecklistSections } from './sandboxChecklist';

export function SandboxChecklistCard() {
  return (
    <Section
      title="샌드박스 점검"
      description="실기기에서 홈 진입과 권한 분기만 빠르게 확인할 수 있도록 핵심 시나리오를 묶었습니다."
    >
      {sandboxChecklistSections.map((section, index) => (
        <View
          key={section.title}
          style={[styles.item, section.tone === 'warning' ? styles.itemWarning : null]}
        >
          <Text style={styles.itemIndex}>{`${index + 1}. ${section.title}`}</Text>
          <Text style={styles.itemDescription}>{section.description}</Text>
        </View>
      ))}
    </Section>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 18,
    padding: spacing.s12,
    gap: spacing.s8,
  },
  itemWarning: {
    backgroundColor: '#FFF5E8',
  },
  itemIndex: {
    color: appColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  itemDescription: {
    color: appColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
