import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';

const Nav = React.lazy(() =>
  import('shared_nav/features/core/components/Nav').then((module) => ({ default: module.Nav }))
);

const Theme = React.lazy(() =>
  import('shared_common_ui/components/Theme').then((module) => ({ default: module.Theme }))
);

const Layout = React.lazy(() =>
  import('shared_common_ui/components/Layout').then((module) => ({ default: module.Layout }))
);

const ErrorIcon = React.lazy(() =>
  import('shared_common_ui/components/ErrorIcon').then((module) => ({ default: module.ErrorIcon }))
);

export const App: React.FC = () => (
  <Router>
    <Suspense fallback={null}>
      <Theme primaryColor={orange[400]}>
        <Layout nav={<Nav title="Cats" />}>
          <ErrorIcon />
        </Layout>
      </Theme>
    </Suspense>
  </Router>
);
