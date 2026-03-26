import { Radio } from '@toss/tds-react-native';
import { personalColorOptions, tempSensitivityOptions, usagePurposeOptions } from '../../shared/constants/options';
import { Section } from '../../shared/components/Section';
import { OnboardingInput, PersonalColorTone, TempSensitivity, UsagePurpose } from '../../shared/types/profile';

interface OnboardingFormProps {
  values: OnboardingInput;
  onChangeTempSensitivity: (value: TempSensitivity) => void;
  onChangeUsagePurpose: (value: UsagePurpose) => void;
  onChangePersonalColorTone: (value: PersonalColorTone) => void;
}

export function OnboardingForm({
  values,
  onChangeTempSensitivity,
  onChangeUsagePurpose,
  onChangePersonalColorTone,
}: OnboardingFormProps) {
  return (
    <>
      <Section title="체감 성향" description="같은 날씨여도 더 춥거나 더 덥게 느끼는 정도를 반영합니다.">
        <Radio<TempSensitivity> value={values.tempSensitivity} onChange={onChangeTempSensitivity}>
          {tempSensitivityOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="주 사용 목적" description="출근용인지, 실내 중심인지, 야외 일정이 많은지에 따라 추천이 달라집니다.">
        <Radio<UsagePurpose> value={values.usagePurpose} onChange={onChangeUsagePurpose}>
          {usagePurposeOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>

      <Section title="퍼스널 컬러" description="선택 입력입니다. 모르겠다면 그대로 진행하면 됩니다.">
        <Radio<PersonalColorTone> value={values.personalColorTone} onChange={onChangePersonalColorTone}>
          {personalColorOptions.map((option) => (
            <Radio.Option key={option.value} value={option.value}>
              {option.label}
            </Radio.Option>
          ))}
        </Radio>
      </Section>
    </>
  );
}

