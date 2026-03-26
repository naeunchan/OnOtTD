import { useEffect, useState } from 'react';
import { getUserProfile } from '../../shared/storage/profileStorage';
import { UserProfile } from '../../shared/types/profile';
import { buildAvatarLook } from '../avatar/buildAvatarLook';
import { recommendOutfit } from '../recommendation/recommendOutfit';
import { RecommendationResult } from '../recommendation/recommendation.types';
import { buildTimeWeatherMode, weatherRepository } from '../weather/weatherRepository';
import { WeatherSnapshot } from '../weather/weather.types';
import { resolveWeatherExecution, ResolvedWeatherExecution, WeatherModeOverride } from '../weather/weatherModeResolver';
import { getWeatherModeOverride } from '../weather/weatherModeStorage';

interface HomeViewModelState {
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  refreshError: string | null;
  weatherModeOverride: WeatherModeOverride;
  weatherExecution: ResolvedWeatherExecution;
  profile: UserProfile | null;
  weather: WeatherSnapshot | null;
  recommendation: RecommendationResult | null;
}

const initialState: HomeViewModelState = {
  loading: true,
  refreshing: false,
  error: null,
  refreshError: null,
  weatherModeOverride: 'system',
  weatherExecution: resolveWeatherExecution('system', buildTimeWeatherMode),
  profile: null,
  weather: null,
  recommendation: null,
};

export function useHomeViewModel() {
  const [state, setState] = useState<HomeViewModelState>(initialState);

  async function load() {
    const hasReadyData = state.profile != null && state.weather != null && state.recommendation != null;

    setState((previous) => ({
      ...previous,
      loading: hasReadyData ? previous.loading : true,
      refreshing: hasReadyData,
      error: null,
      refreshError: null,
    }));

    try {
      const [profile, weatherModeOverride, weather] = await Promise.all([
        getUserProfile(),
        getWeatherModeOverride(),
        weatherRepository.getTodayWeather(),
      ]);
      const weatherExecution = resolveWeatherExecution(weatherModeOverride, buildTimeWeatherMode);
      const recommendation = recommendOutfit({ profile, weather });

      setState({
        loading: false,
        refreshing: false,
        error: null,
        refreshError: null,
        weatherModeOverride,
        weatherExecution,
        profile,
        weather,
        recommendation,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '홈 데이터를 불러오지 못했어요.';

      if (hasReadyData) {
        setState((previous) => ({
          ...previous,
          loading: false,
          refreshing: false,
          refreshError: message,
        }));
        return;
      }

      setState({
        loading: false,
        refreshing: false,
        error: message,
        refreshError: null,
        weatherModeOverride: 'system',
        weatherExecution: resolveWeatherExecution('system', buildTimeWeatherMode),
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
    buildTimeWeatherMode,
    hasFallbackWeather: state.weather?.source === 'mock-fallback',
    usesDefaultLocationWeather: state.weather?.source === 'live-default-location',
  };
}
