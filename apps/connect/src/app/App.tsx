import { Auth } from '@fake-company/auth';
import { ErrorBoundary, Layout, Theme, withFederatedModule } from '@fake-company/common-ui';
import React, { FC, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRemoteProviders } from '../hooks/useRemoteProviders';
import { Routes } from './Routes';
import { store } from './store';

const Nav = withFederatedModule(
  lazy(async () => {
    const { Nav } = await import('mfe_nav/feature-core/components/Nav');
    return { default: Nav };
  })
);

export const App: FC = () => {
  useRemoteProviders();

  return (
    <Theme>
      <ErrorBoundary>
        <Provider store={store}>
          <Router basename="/connect">
            <Auth>
              <Layout nav={<Nav title="Connect" />}>
                <Routes />
              </Layout>
            </Auth>
          </Router>
        </Provider>
      </ErrorBoundary>
    </Theme>
  );
};
