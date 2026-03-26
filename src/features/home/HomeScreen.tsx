import { Button } from '@toss/tds-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';
import { Screen } from '../../shared/components/Screen';
import { AvatarPreview } from '../avatar/AvatarPreview';
import { CarryItemChips } from './CarryItemChips';
import { HomeHeader } from './HomeHeader';
import { TodayOutfitCard } from './TodayOutfitCard';
import { useHomeViewModel } from './useHomeViewModel';
import { WeatherSummaryCard } from './WeatherSummaryCard';

interface HomeScreenProps {
  onOpenSettings: () => void;
}

export function HomeScreen({ onOpenSettings }: HomeScreenProps) {
  const viewModel = useHomeViewModel();

  if (viewModel.loading) {
    return <Screen scrollable={false}>오늘의 착장을 계산하고 있어요.</Screen>;
  }

  if (viewModel.error != null) {
    return (
      <Screen scrollable={false}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>홈 데이터를 불러오지 못했어요.</Text>
          <Text style={styles.errorMessage}>{viewModel.error}</Text>
          <Button onPress={viewModel.reload}>다시 시도</Button>
        </View>
      </Screen>
    );
  }

  if (viewModel.profile == null || viewModel.weather == null || viewModel.recommendation == null || viewModel.avatarLook == null) {
    return <Screen scrollable={false}>추천 데이터를 준비하지 못했어요.</Screen>;
  }

  return (
    <Screen>
      <HomeHeader
        nickname={viewModel.profile.avatar.nickname}
        locationName={viewModel.weather.locationName}
        summary={viewModel.recommendation.summary}
        onOpenSettings={onOpenSettings}
      />

      <AvatarPreview nickname={viewModel.profile.avatar.nickname} look={viewModel.avatarLook} />
      <WeatherSummaryCard weather={viewModel.weather} />
      <TodayOutfitCard recommendation={viewModel.recommendation} />
      <CarryItemChips items={viewModel.recommendation.carryItems} />

      <View style={styles.footerButtons}>
        <Button onPress={viewModel.reload}>실시간 날씨 다시 불러오기</Button>
        <Button onPress={onOpenSettings} style="weak" type="dark">
          설정 보기
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    gap: spacing.s12,
    alignItems: 'center',
  },
  errorTitle: {
    color: appColors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorMessage: {
    color: appColors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerButtons: {
    gap: spacing.s12,
    marginBottom: spacing.s16,
  },
});
