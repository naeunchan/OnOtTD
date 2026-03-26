import { UserProfile } from '../types/profile';

export const DEFAULT_PROFILE: UserProfile = {
  onboardingCompleted: false,
  avatarCompleted: false,
  tempSensitivity: 'balanced',
  usagePurpose: 'commute',
  personalColorTone: 'unknown',
  avatar: {
    nickname: '온옷이',
    faceShape: 'soft',
    expression: 'bright',
  },
};

