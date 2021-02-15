import { Auth } from '@fake-company/auth';
import { Layout, Theme } from '@fake-company/common-ui';
import React, { lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = lazy(async () => {
  const { Nav } = await import('mfe_nav/feature-core/components/Nav');
  return { default: Nav };
});

export const App: React.FC = () => (
  <Providers>
    <Router basename="/connect">
      <Theme>
        <Auth>
          <Layout nav={<Nav title="Connect" />}>
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Providers>
);
