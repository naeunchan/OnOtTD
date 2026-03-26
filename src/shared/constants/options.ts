import { AvatarExpression, AvatarFaceShape, PersonalColorTone, TempSensitivity, UsagePurpose } from '../types/profile';

export const tempSensitivityOptions: Array<{ label: string; value: TempSensitivity }> = [
  { label: '추위를 많이 타요', value: 'cold-sensitive' },
  { label: '보통이에요', value: 'balanced' },
  { label: '더위를 많이 타요', value: 'heat-sensitive' },
];

export const usagePurposeOptions: Array<{ label: string; value: UsagePurpose }> = [
  { label: '출퇴근', value: 'commute' },
  { label: '실내 근무', value: 'office' },
  { label: '야외 일정', value: 'outdoor' },
];

export const personalColorOptions: Array<{ label: string; value: PersonalColorTone }> = [
  { label: '봄 웜', value: 'spring' },
  { label: '여름 쿨', value: 'summer' },
  { label: '가을 웜', value: 'autumn' },
  { label: '겨울 쿨', value: 'winter' },
  { label: '아직 모르겠어요', value: 'unknown' },
];

export const avatarFaceShapeOptions: Array<{ label: string; value: AvatarFaceShape }> = [
  { label: '동글형', value: 'round' },
  { label: '부드러운형', value: 'soft' },
  { label: '또렷한형', value: 'sharp' },
];

export const avatarExpressionOptions: Array<{ label: string; value: AvatarExpression }> = [
  { label: '차분한 표정', value: 'calm' },
  { label: '밝은 표정', value: 'bright' },
];

