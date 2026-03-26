import { Button } from '@toss/tds-react-native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Screen } from '../../shared/components/Screen';
import { getUserProfile, saveOnboardingInput } from '../../shared/storage/profileStorage';
import { UserProfile } from '../../shared/types/profile';
import { OnboardingForm } from './OnboardingForm';
import { useOnboardingDraft } from './useOnboardingDraft';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const draft = useOnboardingDraft(profile);

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

  if (loading) {
    return <Screen scrollable={false}>온보딩 정보를 불러오고 있어요.</Screen>;
  }

  return (
    <Screen
      title="오늘 옷차림을 맞춰볼게요"
      subtitle="MVP에서는 날씨와 사용자 성향만으로 빠르게 추천을 시작합니다."
    >
      <OnboardingForm
        values={draft.draft}
        onChangeTempSensitivity={draft.setTempSensitivity}
        onChangeUsagePurpose={draft.setUsagePurpose}
        onChangePersonalColorTone={draft.setPersonalColorTone}
      />

      <Text style={{ color: appColors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: spacing.s4 }}>
        위치 권한이 있으면 현재 위치 실날씨를 쓰고, 권한이 없으면 기본 지역 날씨로 동작합니다. 외부 API 실패 시에는 mock으로
        폴백합니다.
      </Text>

      <Button loading={saving} onPress={handleSubmit}>
        아바타 만들러 가기
      </Button>
    </Screen>
  );
}
