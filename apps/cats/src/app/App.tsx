import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { Routes } from './Routes';
import { store } from './store';

const RemoteWrapper = React.lazy(() =>
  import('shared_pets/features/core/components/RemoteWrapper').then((module) => ({ default: module.RemoteWrapper }))
);

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
  <Provider store={store}>
    <Suspense fallback={null}>
      <RemoteWrapper store={store}>
        <Router>
          <Theme primaryColor={orange[400]}>
            <Layout nav={<Nav title="Cats" />}>
              <Routes />
            </Layout>
          </Theme>
        </Router>
      </RemoteWrapper>
    </Suspense>
  </Provider>
);
