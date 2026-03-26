import { DEFAULT_PROFILE } from '../mocks/profile.mock';
import { AvatarSetupInput, OnboardingInput, UserProfile } from '../types/profile';
import { getJson, removeString, setJson } from './appStorage';
import { storageKeys } from './storageKeys';

const PROFILE_STORAGE_VERSION = 1;

interface StoredUserProfileV1 {
  version: number;
  data: UserProfile;
}

type StoredUserProfile = StoredUserProfileV1 | UserProfile | null;

export async function getUserProfile(): Promise<UserProfile> {
  const storedProfile = await getJson<StoredUserProfile>(storageKeys.userProfile);
  return normalizeStoredProfile(storedProfile);
}

export async function saveOnboardingInput(input: OnboardingInput): Promise<UserProfile> {
  const current = await getUserProfile();
  const nextProfile: UserProfile = {
    ...current,
    ...input,
    onboardingCompleted: true,
  };

  return saveFullProfile(nextProfile);
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

  return saveFullProfile(nextProfile);
}

export async function saveFullProfile(profile: UserProfile): Promise<UserProfile> {
  const normalizedProfile = normalizeProfile(profile);
  await setJson(storageKeys.userProfile, {
    version: PROFILE_STORAGE_VERSION,
    data: normalizedProfile,
  } satisfies StoredUserProfileV1);
  return normalizedProfile;
}

export async function resetProfile() {
  await removeString(storageKeys.userProfile);
}

function normalizeStoredProfile(storedProfile: StoredUserProfile): UserProfile {
  if (storedProfile == null) {
    return DEFAULT_PROFILE;
  }

  if (isStoredProfileV1(storedProfile)) {
    if (storedProfile.version !== PROFILE_STORAGE_VERSION) {
      return DEFAULT_PROFILE;
    }

    return normalizeProfile(storedProfile.data);
  }

  return normalizeProfile(storedProfile);
}

function isStoredProfileV1(value: StoredUserProfile): value is StoredUserProfileV1 {
  return typeof value === 'object' && value != null && 'version' in value && 'data' in value;
}

function normalizeProfile(profile: UserProfile): UserProfile {
  const avatar = typeof profile.avatar === 'object' && profile.avatar != null ? profile.avatar : DEFAULT_PROFILE.avatar;

  return {
    ...DEFAULT_PROFILE,
    ...profile,
    avatar: {
      ...DEFAULT_PROFILE.avatar,
      ...avatar,
      nickname: avatar.nickname?.trim().length ? avatar.nickname.trim() : DEFAULT_PROFILE.avatar.nickname,
    },
  };
}
