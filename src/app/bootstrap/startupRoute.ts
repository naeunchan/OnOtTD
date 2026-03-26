import { getUserProfile } from '../../shared/storage/profileStorage';

export type StartupRoute = '/' | '/onboarding' | '/avatar-setup';

export async function resolveStartupRoute(): Promise<StartupRoute> {
  const profile = await getUserProfile();

  if (profile.onboardingCompleted === false) {
    return '/onboarding';
  }

  if (profile.avatarCompleted === false) {
    return '/avatar-setup';
  }

  return '/';
}

