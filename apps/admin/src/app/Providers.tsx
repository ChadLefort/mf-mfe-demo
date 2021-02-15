import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

const ContactsProvider = lazy(async () => {
  const { ContactsProvider } = await import('mfe_contacts/feature-core/components/ContactsProvider');
  return { default: ContactsProvider };
});

export const Providers: React.FC = ({ children }) => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <ContactsProvider store={store}>{children}</ContactsProvider>
    </Suspense>
  </Provider>
);
