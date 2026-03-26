import { useEffect, useState } from 'react';
import { getUserProfile } from '../../shared/storage/profileStorage';
import { UserProfile } from '../../shared/types/profile';
import { buildAvatarLook } from '../avatar/buildAvatarLook';
import { recommendOutfit } from '../recommendation/recommendOutfit';
import { RecommendationResult } from '../recommendation/recommendation.types';
import { weatherRepository } from '../weather/weatherRepository';
import { WeatherSnapshot } from '../weather/weather.types';

interface HomeViewModelState {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
  weather: WeatherSnapshot | null;
  recommendation: RecommendationResult | null;
}

const initialState: HomeViewModelState = {
  loading: true,
  error: null,
  profile: null,
  weather: null,
  recommendation: null,
};

export function useHomeViewModel() {
  const [state, setState] = useState<HomeViewModelState>(initialState);

  async function load() {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }));

    try {
      const [profile, weather] = await Promise.all([getUserProfile(), weatherRepository.getTodayWeather()]);
      const recommendation = recommendOutfit({ profile, weather });

      setState({
        loading: false,
        error: null,
        profile,
        weather,
        recommendation,
      });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : '홈 데이터를 불러오지 못했어요.',
        profile: null,
        weather: null,
        recommendation: null,
      });
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return {
    ...state,
    avatarLook:
      state.profile == null || state.recommendation == null ? null : buildAvatarLook(state.profile, state.recommendation),
    reload: load,
  };
}

