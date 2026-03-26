import { UserProfile } from '../../shared/types/profile';
import { RecommendationResult } from '../recommendation/recommendation.types';
import { AvatarLook } from './avatar.types';

const accentColors = {
  autumn: '#B86A34',
  spring: '#F08A24',
  summer: '#5A88E5',
  unknown: '#2274F5',
  winter: '#3949AB',
} as const;

const faceShapeBorderRadius = {
  round: 42,
  soft: 28,
  sharp: 10,
} as const;

const expressionLabels = {
  bright: '밝음',
  calm: '차분함',
} as const;

export function buildAvatarLook(profile: UserProfile, recommendation?: RecommendationResult): AvatarLook {
  return {
    accentColor: accentColors[profile.personalColorTone],
    faceBorderRadius: faceShapeBorderRadius[profile.avatar.faceShape],
    expressionLabel: expressionLabels[profile.avatar.expression],
    topLabel: recommendation?.top ?? '기본 티셔츠',
    bottomLabel: recommendation?.bottom ?? '베이직 팬츠',
    outerLabel: recommendation?.outer ?? undefined,
    accessoryLabels: recommendation?.accessories.map((item) => item.label) ?? [],
  };
}

