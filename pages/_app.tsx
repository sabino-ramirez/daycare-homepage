import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Header from '../components/header';

import theme from '../components/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
