import { Auth } from '@fake-company/auth';
import { Layout, Theme } from '@fake-company/common-ui';
import { red } from '@material-ui/core/colors';
import React, { FC, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = lazy(async () => {
  const { Nav } = await import('mfe_nav/feature-core/components/Nav');
  return { default: Nav };
});

export const App: FC = () => (
  <Providers>
    <Router basename="/admin">
      <Theme primaryColor={red[900]}>
        <Auth>
          <Layout nav={<Nav title="Admin" />}>
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Providers>
);
