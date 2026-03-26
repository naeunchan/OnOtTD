import { DEFAULT_PROFILE } from '../mocks/profile.mock';
import { UserProfile } from '../types/profile';
import { getJson, removeString, setJson } from './appStorage';
import { getUserProfile, resetProfile, saveFullProfile } from './profileStorage';
import { storageKeys } from './storageKeys';

jest.mock('./appStorage', () => ({
  getJson: jest.fn(),
  setJson: jest.fn(),
  removeString: jest.fn(),
}));

const mockedGetJson = jest.mocked(getJson);
const mockedSetJson = jest.mocked(setJson);
const mockedRemoveString = jest.mocked(removeString);

describe('profileStorage', () => {
  beforeEach(() => {
    mockedGetJson.mockReset();
    mockedSetJson.mockReset();
    mockedRemoveString.mockReset();
  });

  it('normalizes and version-wraps a saved profile', async () => {
    const nextProfile: UserProfile = {
      ...DEFAULT_PROFILE,
      onboardingCompleted: true,
      avatarCompleted: true,
      tempSensitivity: 'cold-sensitive',
      avatar: {
        ...DEFAULT_PROFILE.avatar,
        nickname: '  온옷티디  ',
      },
    };

    const savedProfile = await saveFullProfile(nextProfile);

    expect(savedProfile.avatar.nickname).toBe('온옷티디');
    expect(mockedSetJson).toHaveBeenCalledWith(storageKeys.userProfile, {
      version: 1,
      data: {
        ...nextProfile,
        avatar: {
          ...nextProfile.avatar,
          nickname: '온옷티디',
        },
      },
    });
  });

  it('falls back to default profile for unsupported storage versions', async () => {
    mockedGetJson.mockResolvedValue({
      version: 999,
      data: {
        ...DEFAULT_PROFILE,
        onboardingCompleted: true,
      },
    });

    await expect(getUserProfile()).resolves.toEqual(DEFAULT_PROFILE);
  });

  it('reads and normalizes legacy unversioned profile payloads', async () => {
    mockedGetJson.mockResolvedValue({
      onboardingCompleted: true,
      avatarCompleted: true,
      tempSensitivity: 'heat-sensitive',
      usagePurpose: 'office',
      personalColorTone: 'summer',
      avatar: {
        nickname: ' ',
        faceShape: 'sharp',
        expression: 'calm',
      },
    });

    await expect(getUserProfile()).resolves.toEqual({
      ...DEFAULT_PROFILE,
      onboardingCompleted: true,
      avatarCompleted: true,
      tempSensitivity: 'heat-sensitive',
      usagePurpose: 'office',
      personalColorTone: 'summer',
      avatar: {
        nickname: DEFAULT_PROFILE.avatar.nickname,
        faceShape: 'sharp',
        expression: 'calm',
      },
    });
  });

  it('removes the saved profile on reset', async () => {
    await resetProfile();

    expect(mockedRemoveString).toHaveBeenCalledWith(storageKeys.userProfile);
  });
});
