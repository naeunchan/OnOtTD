import { createRoute } from '@granite-js/react-native';
import { useEffect, useState } from 'react';
import { HomeScreen } from '../src/features/home/HomeScreen';
import { Screen } from '../src/shared/components/Screen';
import { resolveStartupRoute } from '../src/app/bootstrap/startupRoute';

export const Route = createRoute('/', {
  component: HomePage,
});

function HomePage() {
  const navigation = Route.useNavigation();
  const [checkedRoute, setCheckedRoute] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const nextRoute = await resolveStartupRoute();

      if (mounted === false) {
        return;
      }

      if (nextRoute !== '/') {
        navigation.navigate(nextRoute);
        return;
      }

      setCheckedRoute(true);
    }

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, [navigation]);

  if (checkedRoute === false) {
    return (
      <Screen scrollable={false}>
        온옷티디를 준비하고 있어요.
      </Screen>
    );
  }

  return <HomeScreen onOpenSettings={() => navigation.navigate('/settings')} />;
}
