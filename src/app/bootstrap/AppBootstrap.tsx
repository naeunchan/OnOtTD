import { PropsWithChildren } from 'react';
import { TDSProvider } from '@toss/tds-react-native';

export function AppBootstrap({ children }: PropsWithChildren) {
  return <TDSProvider>{children}</TDSProvider>;
}

