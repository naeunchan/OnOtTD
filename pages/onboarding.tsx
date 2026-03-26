import { createRoute } from '@granite-js/react-native';
import { OnboardingScreen } from '../src/features/onboarding/OnboardingScreen';

export const Route = createRoute('/onboarding', {
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigation = Route.useNavigation();

  return (
    <OnboardingScreen
      onComplete={() => {
        navigation.navigate('/avatar-setup');
      }}
    />
  );
}
