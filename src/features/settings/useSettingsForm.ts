import { useEffect, useState } from 'react';
import { DEFAULT_PROFILE } from '../../shared/mocks/profile.mock';
import { UserProfile } from '../../shared/types/profile';

export function useSettingsForm(profile?: UserProfile | null) {
  const [draft, setDraft] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    if (profile == null) {
      return;
    }

    setDraft(profile);
  }, [profile]);

  return {
    draft,
    setDraft,
  };
}

