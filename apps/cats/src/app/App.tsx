import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import { Providers } from './Providers';
import { Routes } from './Routes';

const Nav = React.lazy(() =>
  import('shared_nav/features/core/components/Nav').then((module) => ({ default: module.Nav }))
);

const Theme = React.lazy(() =>
  import('shared_common_ui/components/Theme').then((module) => ({ default: module.Theme }))
);

const Layout = React.lazy(() =>
  import('shared_common_ui/components/Layout').then((module) => ({ default: module.Layout }))
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
