import React from 'react';
import { Auth } from '@fake-company/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Theme } from '@fake-company/common-ui';
import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = React.lazy(() => import('mfe_nav/feature-core/components/Nav').then((module) => ({ default: module.Nav })));

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
