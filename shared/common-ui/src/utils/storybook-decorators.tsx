import React from 'react';
import { Layout } from '../components/Layout';
import { Theme } from '../components/Theme';

export const withTheme = (story: () => React.ReactNode) => <Theme>{story()}</Theme>;

export const withLayoutAndTheme = (story: () => React.ReactNode) => (
  <Theme>
    <Layout>{story()}</Layout>
  </Theme>
);
