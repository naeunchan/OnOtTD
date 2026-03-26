import { Button, Radio, TextField } from '@toss/tds-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { avatarExpressionOptions, avatarFaceShapeOptions } from '../../shared/constants/options';
import { DEFAULT_PROFILE } from '../../shared/mocks/profile.mock';
import { Screen } from '../../shared/components/Screen';
import { Section } from '../../shared/components/Section';
import { AvatarExpression, AvatarFaceShape, UserProfile } from '../../shared/types/profile';
import { getUserProfile, saveAvatarSetupInput } from '../../shared/storage/profileStorage';
import { buildAvatarLook } from './buildAvatarLook';
import { AvatarPreview } from './AvatarPreview';

interface AvatarSetupScreenProps {
  onComplete: () => void;
}

export function AvatarSetupScreen({ onComplete }: AvatarSetupScreenProps) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const avatarLook = buildAvatarLook(profile);

  async function handleSave() {
    setSaving(true);
    await saveAvatarSetupInput({
      nickname: profile.avatar.nickname.trim().length === 0 ? '온옷이' : profile.avatar.nickname.trim(),
      faceShape: profile.avatar.faceShape,
      expression: profile.avatar.expression,
    });
    setSaving(false);
    onComplete();
  }

  if (loading) {
    return <Screen scrollable={false}>아바타를 준비하고 있어요.</Screen>;
  }

  return (
    <Screen
      title="아바타 만들기"
      subtitle="복잡한 커스터마이징 대신 MVP에 필요한 기본 모습만 먼저 고정합니다."
    >
      <AvatarPreview nickname={profile.avatar.nickname || '온옷이'} look={avatarLook} />

      <Section title="기본 정보" description="홈 화면 상단과 아바타 카드에서 사용할 이름이에요.">
        <TextField
          variant="line"
          placeholder="아바타 이름"
          value={profile.avatar.nickname}
          onChangeText={(nickname) => {
            setProfile((previous) => ({
              ...previous,
              avatar: {
                ...previous.avatar,
                nickname,
              },
            }));
          }}
        />
      </Section>

      <Section title="얼굴형" description="의상 카드와 함께 보이는 아바타의 인상을 정합니다.">
        <Radio<AvatarFaceShape>
          value={profile.avatar.faceShape}
          onChange={(faceShape) => {
            setProfile((previous) => ({
              ...previous,
              avatar: {
                ...previous.avatar,
                faceShape,
              },
            }));
          }}
        >
          {avatarFaceShapeOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="표정" description="오늘의 착장을 보여줄 때 전달되는 분위기입니다.">
        <Radio<AvatarExpression>
          value={profile.avatar.expression}
          onChange={(expression) => {
            setProfile((previous) => ({
              ...previous,
              avatar: {
                ...previous.avatar,
                expression,
              },
            }));
          }}
        >
          {avatarExpressionOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <View style={styles.footer}>
        <Text style={styles.caption}>다음 단계부터는 홈 화면에서 날씨 기반 착장이 자동으로 반영됩니다.</Text>
        <Button loading={saving} onPress={handleSave}>
          홈으로 시작하기
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: spacing.s12,
  },
  caption: {
    color: appColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

