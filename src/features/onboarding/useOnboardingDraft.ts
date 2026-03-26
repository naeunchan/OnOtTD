import { useEffect, useState } from 'react';
import { DEFAULT_PROFILE } from '../../shared/mocks/profile.mock';
import { OnboardingInput, UserProfile } from '../../shared/types/profile';

export function useOnboardingDraft(profile?: UserProfile | null) {
  const [draft, setDraft] = useState<OnboardingInput>({
    tempSensitivity: DEFAULT_PROFILE.tempSensitivity,
    usagePurpose: DEFAULT_PROFILE.usagePurpose,
    personalColorTone: DEFAULT_PROFILE.personalColorTone,
  });

  useEffect(() => {
    if (profile == null) {
      return;
    }

    setDraft({
      tempSensitivity: profile.tempSensitivity,
      usagePurpose: profile.usagePurpose,
      personalColorTone: profile.personalColorTone,
    });
  }, [profile]);

  return {
    draft,
    setTempSensitivity(tempSensitivity: OnboardingInput['tempSensitivity']) {
      setDraft((previous) => ({
        ...previous,
        tempSensitivity,
      }));
    },
    setUsagePurpose(usagePurpose: OnboardingInput['usagePurpose']) {
      setDraft((previous) => ({
        ...previous,
        usagePurpose,
      }));
    },
    setPersonalColorTone(personalColorTone: OnboardingInput['personalColorTone']) {
      setDraft((previous) => ({
        ...previous,
        personalColorTone,
      }));
    },
  };
}

