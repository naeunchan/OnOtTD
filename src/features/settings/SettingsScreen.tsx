import { Button } from '@toss/tds-react-native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Screen } from '../../shared/components/Screen';
import { getUserProfile, resetProfile, saveFullProfile } from '../../shared/storage/profileStorage';
import { UserProfile } from '../../shared/types/profile';
import { AvatarPreview } from '../avatar/AvatarPreview';
import { buildAvatarLook } from '../avatar/buildAvatarLook';
import { SettingsForm } from './SettingsForm';
import { useSettingsForm } from './useSettingsForm';

interface SettingsScreenProps {
  onSaved: () => void;
  onReset: () => void;
}

export function SettingsScreen({ onSaved, onReset }: SettingsScreenProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const form = useSettingsForm(profile);

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

  async function handleSave() {
    setSaving(true);
    await saveFullProfile({
      ...form.draft,
      onboardingCompleted: true,
      avatarCompleted: true,
      avatar: {
        ...form.draft.avatar,
        nickname: form.draft.avatar.nickname.trim().length === 0 ? '온옷이' : form.draft.avatar.nickname.trim(),
      },
    });
    setSaving(false);
    onSaved();
  }

  function handleReset() {
    Alert.alert('온보딩부터 다시 시작할까요?', '성향, 목적, 아바타 설정을 기본값으로 돌립니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '초기화',
        style: 'destructive',
        onPress: async () => {
          setResetting(true);
          await resetProfile();
          setResetting(false);
          onReset();
        },
      },
    ]);
  }

  if (loading) {
    return <Screen scrollable={false}>설정을 불러오고 있어요.</Screen>;
  }

  return (
    <Screen title="설정" subtitle="MVP에서는 옷차림 추천에 필요한 값만 수정합니다.">
      <AvatarPreview nickname={form.draft.avatar.nickname || '온옷이'} look={buildAvatarLook(form.draft)} />
      <SettingsForm value={form.draft} onChange={form.setDraft} />
      <Text style={{ color: appColors.textSecondary, fontSize: 14, lineHeight: 20 }}>
        이 빌드는 `geolocation` 권한이 선언되어 있습니다. 권한이 허용되면 현재 위치 날씨를, 아니면 기본 지역 날씨를 사용합니다.
      </Text>
      <View style={{ gap: spacing.s12 }}>
        <Button loading={saving} onPress={handleSave}>
          저장하고 홈으로
        </Button>
        <Button loading={resetting} onPress={handleReset} style="weak" type="danger">
          온보딩부터 다시 시작
        </Button>
      </View>
    </Screen>
  );
}
