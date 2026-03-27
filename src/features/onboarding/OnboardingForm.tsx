import { Radio } from '@toss/tds-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Section } from '../../shared/components/Section';
import { OnboardingInput, PersonalColorTone, TempSensitivity, UsagePurpose } from '../../shared/types/profile';
import { onboardingQuestions } from './onboardingQuestions';

interface OnboardingFormProps {
  stepIndex: number;
  values: OnboardingInput;
  onChangeTempSensitivity: (value: TempSensitivity) => void;
  onChangeUsagePurpose: (value: UsagePurpose) => void;
  onChangePersonalColorTone: (value: PersonalColorTone) => void;
}

export function OnboardingForm({
  stepIndex,
  values,
  onChangeTempSensitivity,
  onChangeUsagePurpose,
  onChangePersonalColorTone,
}: OnboardingFormProps) {
  const question = onboardingQuestions[stepIndex]!;
  const progress = (stepIndex + 1) / onboardingQuestions.length;

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          {stepIndex + 1} / {onboardingQuestions.length}
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.stepLabelContainer}>
        {onboardingQuestions.map((item, index) => (
          <View key={item.key} style={[styles.stepBadge, index === stepIndex && styles.stepBadgeActive]}>
            <Text style={[styles.stepLabelIndex, index === stepIndex && styles.stepLabelIndexActive]}>{index + 1}</Text>
          </View>
        ))}
      </View>

      {question.key === 'tempSensitivity' ? (
        <Section title={question.title} description={question.description}>
          <Radio<TempSensitivity> value={values.tempSensitivity} onChange={onChangeTempSensitivity}>
            {question.options.map((option) => (
              <Radio.Option key={option.value} value={option.value}>
                {option.label}
              </Radio.Option>
            ))}
          </Radio>
        </Section>
      ) : null}

      {question.key === 'usagePurpose' ? (
        <Section title={question.title} description={question.description}>
          <Radio<UsagePurpose> value={values.usagePurpose} onChange={onChangeUsagePurpose}>
            {question.options.map((option) => (
              <Radio.Option key={option.value} value={option.value}>
                {option.label}
              </Radio.Option>
            ))}
          </Radio>
        </Section>
      ) : null}

      {question.key === 'personalColorTone' ? (
        <Section title={question.title} description={question.description}>
          <Radio<PersonalColorTone> value={values.personalColorTone} onChange={onChangePersonalColorTone}>
            {question.options.map((option) => (
              <Radio.Option key={option.value} value={option.value}>
                {option.label}
              </Radio.Option>
            ))}
          </Radio>
        </Section>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.s16,
  },
  progressHeader: {
    gap: spacing.s8,
  },
  progressText: {
    color: appColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 999,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: appColors.primary,
    borderRadius: 999,
    height: '100%',
  },
  stepLabelContainer: {
    flexDirection: 'row',
    gap: spacing.s8,
  },
  stepBadge: {
    alignItems: 'center',
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  stepBadgeActive: {
    backgroundColor: appColors.primarySoft,
  },
  stepLabelIndex: {
    color: appColors.textTertiary,
    fontSize: 13,
    fontWeight: '700',
  },
  stepLabelIndexActive: {
    color: appColors.primary,
  },
});
