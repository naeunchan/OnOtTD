import { personalColorOptions, tempSensitivityOptions, usagePurposeOptions } from '../../shared/constants/options';
import { PersonalColorTone, TempSensitivity, UsagePurpose } from '../../shared/types/profile';

type OnboardingQuestion =
  | {
      key: 'tempSensitivity';
      title: string;
      description: string;
      options: Array<{ label: string; value: TempSensitivity }>;
    }
  | {
      key: 'usagePurpose';
      title: string;
      description: string;
      options: Array<{ label: string; value: UsagePurpose }>;
    }
  | {
      key: 'personalColorTone';
      title: string;
      description: string;
      options: Array<{ label: string; value: PersonalColorTone }>;
    };

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    key: 'tempSensitivity',
    title: '추위와 더위를 얼마나 타나요?',
    description: '같은 날씨여도 체감 성향에 따라 추천 두께와 겉옷이 달라집니다.',
    options: tempSensitivityOptions,
  },
  {
    key: 'usagePurpose',
    title: '오늘 옷차림은 어떤 일정에 더 가깝나요?',
    description: '출근용인지, 실내 중심인지, 야외 일정이 많은지에 따라 추천이 달라집니다.',
    options: usagePurposeOptions,
  },
  {
    key: 'personalColorTone',
    title: '퍼스널 컬러를 알고 있나요?',
    description: '선택 입력입니다. 모르겠다면 그대로 진행하면 됩니다.',
    options: personalColorOptions,
  },
];
