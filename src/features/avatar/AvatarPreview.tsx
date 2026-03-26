import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { AvatarLook } from './avatar.types';

interface AvatarPreviewProps {
  nickname: string;
  look: AvatarLook;
}

export function AvatarPreview({ nickname, look }: AvatarPreviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.scene}>
        <View style={[styles.face, { borderRadius: look.faceBorderRadius, borderColor: look.accentColor }]}>
          <Text style={styles.faceText}>{look.expressionLabel}</Text>
        </View>
        {look.outerLabel == null ? null : (
          <View style={[styles.outerLayer, { backgroundColor: look.accentColor }]}>
            <Text style={styles.layerText}>{look.outerLabel}</Text>
          </View>
        )}
        <View style={styles.topLayer}>
          <Text style={styles.layerTextDark}>{look.topLabel}</Text>
        </View>
        <View style={styles.bottomLayer}>
          <Text style={styles.layerTextDark}>{look.bottomLabel}</Text>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text style={styles.metaText}>
          {look.accessoryLabels.length === 0 ? '챙길 물건 없음' : look.accessoryLabels.join(' · ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: appColors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: appColors.border,
    padding: spacing.s16,
    gap: spacing.s16,
  },
  scene: {
    alignItems: 'center',
    gap: spacing.s8,
  },
  face: {
    width: 82,
    height: 82,
    borderWidth: 3,
    backgroundColor: '#FFF6EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceText: {
    color: appColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  outerLayer: {
    minWidth: 168,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
    borderRadius: 22,
    alignItems: 'center',
  },
  topLayer: {
    minWidth: 150,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
    borderRadius: 18,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
  },
  bottomLayer: {
    minWidth: 134,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
    borderRadius: 18,
    backgroundColor: '#E9EEF5',
    alignItems: 'center',
  },
  layerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  layerTextDark: {
    color: appColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  meta: {
    gap: spacing.s4,
  },
  nickname: {
    color: appColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  metaText: {
    color: appColors.textSecondary,
    fontSize: 14,
  },
});

