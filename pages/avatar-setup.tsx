import { createRoute } from '@granite-js/react-native';
import { AvatarSetupScreen } from '../src/features/avatar/AvatarSetupScreen';

export const Route = createRoute('/avatar-setup', {
  component: AvatarSetupPage,
});

function AvatarSetupPage() {
  const navigation = Route.useNavigation();

  return (
    <AvatarSetupScreen
      onComplete={() => {
        navigation.navigate('/');
      }}
    />
  );
}
