import { Radio, TextField } from '@toss/tds-react-native';
import {
  avatarExpressionOptions,
  avatarFaceShapeOptions,
  personalColorOptions,
  tempSensitivityOptions,
  usagePurposeOptions,
} from '../../shared/constants/options';
import { Section } from '../../shared/components/Section';
import {
  AvatarExpression,
  AvatarFaceShape,
  PersonalColorTone,
  TempSensitivity,
  UsagePurpose,
  UserProfile,
} from '../../shared/types/profile';

interface SettingsFormProps {
  value: UserProfile;
  onChange: (next: UserProfile) => void;
}

export function SettingsForm({ value, onChange }: SettingsFormProps) {
  return (
    <>
      <Section title="체감 성향">
        <Radio<TempSensitivity>
          value={value.tempSensitivity}
          onChange={(tempSensitivity) => {
            onChange({
              ...value,
              tempSensitivity,
            });
          }}
        >
          {tempSensitivityOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="사용 목적">
        <Radio<UsagePurpose>
          value={value.usagePurpose}
          onChange={(usagePurpose) => {
            onChange({
              ...value,
              usagePurpose,
            });
          }}
        >
          {usagePurposeOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="퍼스널 컬러">
        <Radio<PersonalColorTone>
          value={value.personalColorTone}
          onChange={(personalColorTone) => {
            onChange({
              ...value,
              personalColorTone,
            });
          }}
        >
          {personalColorOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="아바타 이름">
        <TextField
          variant="line"
          placeholder="아바타 이름"
          value={value.avatar.nickname}
          onChangeText={(nickname) => {
            onChange({
              ...value,
              avatar: {
                ...value.avatar,
                nickname,
              },
            });
          }}
        />
      </Section>

      <Section title="얼굴형">
        <Radio<AvatarFaceShape>
          value={value.avatar.faceShape}
          onChange={(faceShape) => {
            onChange({
              ...value,
              avatar: {
                ...value.avatar,
                faceShape,
              },
            });
          }}
        >
          {avatarFaceShapeOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="표정">
        <Radio<AvatarExpression>
          value={value.avatar.expression}
          onChange={(expression) => {
            onChange({
              ...value,
              avatar: {
                ...value.avatar,
                expression,
              },
            });
          }}
        >
          {avatarExpressionOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>
    </>
  );
}

