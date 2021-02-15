import React, { ReactNode } from 'react';

import { Layout } from '../components/Layout';
import { Theme } from '../components/Theme';

export const withTheme = (story: () => ReactNode) => <Theme>{story()}</Theme>;

export const withLayoutAndTheme = (story: () => ReactNode) => (
  <Theme>
    <Layout>{story()}</Layout>
  </Theme>
);
