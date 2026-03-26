import { createRoute } from '@granite-js/react-native';
import { SettingsScreen } from '../src/features/settings/SettingsScreen';

export const Route = createRoute('/settings', {
  component: SettingsPage,
});

function SettingsPage() {
  const navigation = Route.useNavigation();

  return (
    <SettingsScreen
      onSaved={() => {
        navigation.navigate('/');
      }}
      onReset={() => {
        navigation.navigate('/onboarding');
      }}
    />
  );
}
