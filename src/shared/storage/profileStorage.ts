import { DEFAULT_PROFILE } from '../mocks/profile.mock';
import { AvatarSetupInput, OnboardingInput, UserProfile } from '../types/profile';
import { getJson, removeString, setJson } from './appStorage';
import { storageKeys } from './storageKeys';

export async function getUserProfile(): Promise<UserProfile> {
  const storedProfile = await getJson<UserProfile>(storageKeys.userProfile);
  return storedProfile ?? DEFAULT_PROFILE;
}

export async function saveOnboardingInput(input: OnboardingInput): Promise<UserProfile> {
  const current = await getUserProfile();
  const nextProfile: UserProfile = {
    ...current,
    ...input,
    onboardingCompleted: true,
  };

  await setJson(storageKeys.userProfile, nextProfile);
  return nextProfile;
}

export async function saveAvatarSetupInput(input: AvatarSetupInput): Promise<UserProfile> {
  const current = await getUserProfile();
  const nextProfile: UserProfile = {
    ...current,
    avatarCompleted: true,
    avatar: {
      ...current.avatar,
      ...input,
    },
  };

  await setJson(storageKeys.userProfile, nextProfile);
  return nextProfile;
}

export async function saveFullProfile(profile: UserProfile): Promise<UserProfile> {
  await setJson(storageKeys.userProfile, profile);
  return profile;
}

export async function resetProfile() {
  await removeString(storageKeys.userProfile);
}

