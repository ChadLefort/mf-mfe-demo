import React from 'react';
import { ErrorIcon } from 'components/ErrorIcon';
import { Layout } from 'components/Layout';
import { Theme } from 'components/Theme';

export const App: React.FC = () => (
  <Theme>
    <Layout>
      <ErrorIcon />
    </Layout>
  </Theme>
);
