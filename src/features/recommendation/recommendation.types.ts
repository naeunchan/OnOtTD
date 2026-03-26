export interface AccessoryRecommendation {
  id: 'mask' | 'sunglasses' | 'parasol';
  label: string;
  reason: string;
}

export interface RecommendationResult {
  summary: string;
  top: string;
  outer: string | null;
  bottom: string;
  shoes: string;
  accessories: AccessoryRecommendation[];
  carryItems: string[];
  paletteLabel: string;
  reasonLines: string[];
  temperatureBandLabel: string;
}

