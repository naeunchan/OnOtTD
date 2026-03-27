import { Button } from '@toss/tds-react-native';
import { createRoute } from '@granite-js/react-native';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../src/app/theme/colors';
import { spacing } from '../src/app/theme/spacing';
import { Screen } from '../src/shared/components/Screen';

// Reserved routes are discovered by file name at runtime but omitted from generated route typings.
export const Route = createRoute('/_404' as never, {
  component: NotFoundPage,
});

function NotFoundPage() {
  const navigation = Route.useNavigation();

  return (
    <Screen
      scrollable={false}
      title="화면을 찾지 못했어요"
      subtitle="샌드박스에서 잘못된 스킴이나 이전 경로가 남아 있으면 이 화면이 보일 수 있어요."
    >
      <View style={styles.body}>
        <Text style={styles.description}>
          온옷티디 홈으로 다시 이동해 현재 빌드에 등록된 경로로 진입해 주세요.
        </Text>
        <Button onPress={() => navigation.navigate('/')}>홈으로 이동</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: spacing.s16,
    justifyContent: 'center',
  },
  description: {
    color: appColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
