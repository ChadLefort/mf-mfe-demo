import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

const ContactsProvider = React.lazy(() =>
  import('mfe_contacts/features/core/components/ContactsProvider').then((module) => ({
    default: module.ContactsProvider
  }))
);

export const Providers: React.FC = ({ children }) => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <ContactsProvider store={store}>{children}</ContactsProvider>
    </Suspense>
  </Provider>
);
