import { AppsInToss } from '@apps-in-toss/framework';
import { InitialProps } from '@granite-js/react-native';
import { PropsWithChildren } from 'react';
import { AppBootstrap } from './app/bootstrap/AppBootstrap';
import { context } from '../require.context';

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
  return <AppBootstrap>{children}</AppBootstrap>;
}

export default AppsInToss.registerApp(AppContainer, { context });
