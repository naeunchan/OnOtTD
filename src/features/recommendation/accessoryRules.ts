import { AccessoryRecommendation } from './recommendation.types';
import { WeatherSnapshot } from '../weather/weather.types';

export function buildAccessoryRecommendations(weather: WeatherSnapshot): AccessoryRecommendation[] {
  const accessories: AccessoryRecommendation[] = [];

  if (weather.dustGrade === 'bad' || weather.dustGrade === 'very-bad') {
    accessories.push({
      id: 'mask',
      label: '마스크',
      reason: '미세먼지가 나쁨 이상이에요.',
    });
  }

  if (weather.uvLevel === 'high' || weather.uvLevel === 'very-high' || weather.uvIndex >= 6) {
    accessories.push({
      id: 'sunglasses',
      label: '선글라스',
      reason: '자외선이 높아요.',
    });
    accessories.push({
      id: 'parasol',
      label: '양산',
      reason: '강한 햇빛을 피하는 편이 좋아요.',
    });
  }

  return accessories;
}

