import { mapPm10ToDustGrade, mapUvIndexToLevel, mapWeatherCodeToCondition } from './liveWeatherMapper';

describe('liveWeatherRepository helpers', () => {
  it('maps rainy weather codes to rainy condition', () => {
    expect(mapWeatherCodeToCondition(63)).toBe('rainy');
  });

  it('maps pm10 values to korean-style dust grades', () => {
    expect(mapPm10ToDustGrade(22)).toBe('good');
    expect(mapPm10ToDustGrade(65)).toBe('normal');
    expect(mapPm10ToDustGrade(120)).toBe('bad');
    expect(mapPm10ToDustGrade(188)).toBe('very-bad');
  });

  it('maps uv index to UV levels', () => {
    expect(mapUvIndexToLevel(2)).toBe('low');
    expect(mapUvIndexToLevel(4)).toBe('moderate');
    expect(mapUvIndexToLevel(6)).toBe('high');
    expect(mapUvIndexToLevel(9)).toBe('very-high');
  });
});
