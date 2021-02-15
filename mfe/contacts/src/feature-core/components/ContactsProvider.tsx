import { InjectStore } from '@fake-company/types';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { contactsApi } from '../contacts.api';

type Props = {
  store: InjectStore;
};

export const ContactsProvider: React.FC<Props> = ({ store, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    store.injectMiddleware(contactsApi.middleware);
    store.injectReducer(contactsApi.reducerPath, contactsApi.reducer);
    setIsLoaded(Object.keys(store.getState()).some((k) => k === contactsApi.reducerPath));
  }, [store]);

  return isLoaded ? <Provider store={store}>{children}</Provider> : null;
};
