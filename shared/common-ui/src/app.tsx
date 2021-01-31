import { ErrorIcon } from 'components/ErrorIcon';
import { Layout } from 'components/Layout';
import { Theme } from 'components/Theme';
import React from 'react';

export const App: React.FC = () => (
  <Theme>
    <Layout>
      <ErrorIcon />
    </Layout>
  </Theme>
);
