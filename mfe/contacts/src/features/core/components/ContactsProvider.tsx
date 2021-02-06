import { InjectStore } from '@fake-company/types';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { injectableReducer } from '../../../common/reducer';

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
