import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import { customTheme } from '@/components/common/utils/constants/ant.theme';
import { Layout } from '@/components/common/components/layout/layout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const getDefaultLayout = (page: ReactElement): ReactNode => (
  <Layout>{page}</Layout>
);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomAppProps {
  Component?: NextPageWithLayout;
  session: never;
}

export default function MyApp({ Component, pageProps, session }: AppProps & CustomAppProps) {
  const getLayout = Component.getLayout || getDefaultLayout;

  return <ConfigProvider theme={customTheme}>
    <GlobalStyle />
    {getLayout(<Component {...pageProps} />)}
    {/* <Component {...pageProps} /> */}
  </ConfigProvider>
}

