import React, { useEffect, useState } from 'react';
import { injectableReducer } from '../../app/reducer';
import { InjectStore } from '@fake-company/types';
import { Provider } from 'react-redux';

type Props = {
  store: InjectStore;
};

export const ContactsProvider: React.FC<Props> = ({ store, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const key = 'contacts';

  useEffect(() => {
    store.injectReducer(key, injectableReducer);
    setIsLoaded(Object.keys(store.getState()).some((k) => k === key));
  }, [store]);

  return isLoaded ? <Provider store={store}>{children}</Provider> : null;
};
