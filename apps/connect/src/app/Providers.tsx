import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

const PetsProvider = React.lazy(() =>
  import('mfe_contacts/features/core/components/PetsProvider').then((module) => ({
    default: module.PetsProvider
  }))
);

export const Providers: React.FC = ({ children }) => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <PetsProvider store={store}>{children}</PetsProvider>
    </Suspense>
  </Provider>
);
