import { Button } from '@toss/tds-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Screen } from '../../shared/components/Screen';
import { getUserProfile, saveOnboardingInput } from '../../shared/storage/profileStorage';
import { UserProfile } from '../../shared/types/profile';
import { OnboardingForm } from './OnboardingForm';
import { onboardingQuestions } from './onboardingQuestions';
import { useOnboardingDraft } from './useOnboardingDraft';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const draft = useOnboardingDraft(profile);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === onboardingQuestions.length - 1;

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const storedProfile = await getUserProfile();

      if (mounted) {
        setProfile(storedProfile);
        setLoading(false);
      }
    }

    void loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit() {
    setSaving(true);
    await saveOnboardingInput(draft.draft);
    setSaving(false);
    onComplete();
  }

  function handleNext() {
    if (isLastStep) {
      void handleSubmit();
      return;
    }

    setStepIndex((previous) => previous + 1);
  }

  function handleBack() {
    if (isFirstStep) {
      return;
    }

    setStepIndex((previous) => previous - 1);
  }

  if (loading) {
    return <Screen scrollable={false}>온보딩 정보를 불러오고 있어요.</Screen>;
  }

  return (
    <Screen
      title="오늘 옷차림을 맞춰볼게요"
      subtitle={`${stepIndex + 1}번째 질문이에요. 한 번에 하나씩 빠르게 설정합니다.`}
    >
      <OnboardingForm
        stepIndex={stepIndex}
        values={draft.draft}
        onChangeTempSensitivity={draft.setTempSensitivity}
        onChangeUsagePurpose={draft.setUsagePurpose}
        onChangePersonalColorTone={draft.setPersonalColorTone}
      />

      <Text style={styles.helperText}>
        위치 권한이 있으면 현재 위치 실날씨를 쓰고, 권한이 없으면 기본 지역 날씨로 동작합니다. 외부 API 실패 시에는 mock으로
        폴백합니다.
      </Text>

      <View style={styles.actions}>
        {isFirstStep ? null : (
          <Button onPress={handleBack} style="weak" type="dark">
            이전 질문
          </Button>
        )}
        <Button loading={saving} onPress={handleNext}>
          {isLastStep ? '아바타 만들러 가기' : '다음 질문'}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  helperText: {
    color: appColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.s4,
  },
  actions: {
    gap: spacing.s12,
    marginTop: spacing.s4,
  },
});
