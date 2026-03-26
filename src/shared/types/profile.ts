export type TempSensitivity = 'cold-sensitive' | 'balanced' | 'heat-sensitive';
export type UsagePurpose = 'commute' | 'office' | 'outdoor';
export type PersonalColorTone = 'spring' | 'summer' | 'autumn' | 'winter' | 'unknown';
export type AvatarFaceShape = 'round' | 'soft' | 'sharp';
export type AvatarExpression = 'calm' | 'bright';

export interface AvatarConfig {
  nickname: string;
  faceShape: AvatarFaceShape;
  expression: AvatarExpression;
}

export interface OnboardingInput {
  tempSensitivity: TempSensitivity;
  usagePurpose: UsagePurpose;
  personalColorTone: PersonalColorTone;
}

export interface AvatarSetupInput {
  nickname: string;
  faceShape: AvatarFaceShape;
  expression: AvatarExpression;
}

export interface UserProfile extends OnboardingInput {
  onboardingCompleted: boolean;
  avatarCompleted: boolean;
  avatar: AvatarConfig;
}

