import { orange } from '@material-ui/core/colors';
import { Auth } from '@pet-tracker/auth';
import { Layout, Theme } from '@pet-tracker/common-ui';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = React.lazy(() =>
  import('remote_nav/features/core/components/Nav').then((module) => ({ default: module.Nav }))
);

export const App: React.FC = () => (
  <Providers>
    <Router>
      <Theme primaryColor={orange[400]}>
        <Auth>
          <Layout nav={<Nav title="Cats" />}>
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Providers>
);
