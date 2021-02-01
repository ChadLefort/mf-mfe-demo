import { orange } from '@material-ui/core/colors';
import { Layout, Theme } from '@pet-tracker/common-ui';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = React.lazy(() =>
  import('shared_nav/features/core/components/Nav').then((module) => ({ default: module.Nav }))
);

export const App: React.FC = () => (
  <Providers>
    <Router>
      <Theme primaryColor={orange[400]}>
        <Layout nav={<Nav title="Cats" />}>
          <Routes />
        </Layout>
      </Theme>
    </Router>
  </Providers>
);
