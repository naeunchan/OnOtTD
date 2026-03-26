import { recommendOutfit } from './recommendOutfit';
import { DEFAULT_PROFILE } from '../../shared/mocks/profile.mock';
import { DEFAULT_WEATHER_MOCK } from '../../shared/mocks/weather.mock';

describe('recommendOutfit', () => {
  it('adds mask and sun protection when dust and UV are high', () => {
    const result = recommendOutfit({
      profile: {
        ...DEFAULT_PROFILE,
        onboardingCompleted: true,
        avatarCompleted: true,
      },
      weather: DEFAULT_WEATHER_MOCK,
    });

    expect(result.accessories.map((item) => item.id)).toEqual(['mask', 'sunglasses', 'parasol']);
  });

  it('recommends lighter clothes for heat-sensitive users on warm days', () => {
    const result = recommendOutfit({
      profile: {
        ...DEFAULT_PROFILE,
        onboardingCompleted: true,
        avatarCompleted: true,
        tempSensitivity: 'heat-sensitive',
      },
      weather: {
        ...DEFAULT_WEATHER_MOCK,
        apparentTemperatureC: 24,
        dustGrade: 'good',
        uvIndex: 2,
        uvLevel: 'low',
      },
    });

    expect(result.outer).toBeNull();
    expect(result.top).toContain('반팔');
  });
});

