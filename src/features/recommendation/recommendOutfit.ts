import { formatPersonalColorTone, formatUsagePurpose, formatWeatherCondition } from '../../shared/utils/formatter';
import { getEffectiveTemperature, getTemperatureBand } from '../../shared/utils/temperature';
import { UserProfile } from '../../shared/types/profile';
import { WeatherSnapshot } from '../weather/weather.types';
import { buildAccessoryRecommendations } from './accessoryRules';
import { RecommendationResult } from './recommendation.types';

interface RecommendOutfitOptions {
  profile: UserProfile;
  weather: WeatherSnapshot;
}

export function recommendOutfit({ profile, weather }: RecommendOutfitOptions): RecommendationResult {
  const effectiveTemperature = getEffectiveTemperature(weather.apparentTemperatureC, profile.tempSensitivity);
  const temperatureBand = getTemperatureBand(effectiveTemperature);
  const accessories = buildAccessoryRecommendations(weather);

  let top = '긴팔 티셔츠';
  let outer: string | null = '가벼운 재킷';
  let bottom = '롱 팬츠';
  let shoes = '스니커즈';
  let temperatureBandLabel = '선선한 날씨';

  if (temperatureBand === 'freezing') {
    top = '도톰한 니트';
    outer = '패딩';
    bottom = '기모 팬츠';
    shoes = '보온 스니커즈';
    temperatureBandLabel = '한겨울 체감';
  } else if (temperatureBand === 'cold') {
    top = '니트 또는 맨투맨';
    outer = '코트 또는 점퍼';
    bottom = '두께감 있는 팬츠';
    shoes = '양말이 보이는 스니커즈';
    temperatureBandLabel = '쌀쌀한 날씨';
  } else if (temperatureBand === 'mild') {
    top = '긴팔 티셔츠';
    outer = '가디건 또는 바람막이';
    bottom = '데님 또는 슬랙스';
    shoes = '가벼운 스니커즈';
    temperatureBandLabel = '가벼운 레이어링 날씨';
  } else if (temperatureBand === 'warm') {
    top = '반팔 티셔츠';
    outer = null;
    bottom = '얇은 팬츠';
    shoes = '통풍 좋은 스니커즈';
    temperatureBandLabel = '따뜻한 날씨';
  } else {
    top = '통기성 좋은 반팔';
    outer = null;
    bottom = '얇은 팬츠 또는 반바지';
    shoes = '샌들이 아닌 가벼운 운동화';
    temperatureBandLabel = '한여름 체감';
  }

  if (profile.usagePurpose === 'office') {
    top = outer == null ? '단정한 반팔 셔츠' : '단정한 셔츠 또는 블라우스';
    bottom = '슬랙스';
  }

  if (profile.usagePurpose === 'outdoor') {
    shoes = '쿠션감 있는 운동화';
    if (outer != null && temperatureBand !== 'freezing') {
      outer = '생활 방수 아우터';
    }
  }

  if (weather.condition === 'rainy') {
    outer = outer == null ? '얇은 생활 방수 아우터' : outer;
    shoes = '미끄럼 적은 신발';
  }

  const carryItems = accessories.map((item) => item.label);
  const paletteLabel = formatPersonalColorTone(profile.personalColorTone);
  const purposeLabel = formatUsagePurpose(profile.usagePurpose);
  const conditionLabel = formatWeatherCondition(weather.condition);

  const reasonLines = [
    `${conditionLabel}, 체감 ${weather.apparentTemperatureC}°C 기준으로 계산했어요.`,
    `${purposeLabel} 일정과 ${paletteLabel} 톤을 반영했어요.`,
    accessories.length === 0 ? '추가로 챙길 물건은 많지 않아요.' : accessories.map((item) => item.reason).join(' '),
  ];

  return {
    summary: `${temperatureBandLabel}이라 ${outer == null ? top : `${outer} 위에 ${top}`.trim()} 조합을 추천해요.`,
    top,
    outer,
    bottom,
    shoes,
    accessories,
    carryItems,
    paletteLabel,
    reasonLines,
    temperatureBandLabel,
  };
}

