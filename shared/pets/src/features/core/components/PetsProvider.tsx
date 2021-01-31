import React, { useEffect, useState } from 'react';
import { InjectStore } from '@pet-tracker/types';
import { petsReducer } from '../pets.slice';
import { Provider } from 'react-redux';

type Props = {
  store: InjectStore;
};

export const PetsProvider: React.FC<Props> = ({ store, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const key = 'pets';

  useEffect(() => {
    store.injectReducer(key, petsReducer);
    setIsLoaded(Object.keys(store.getState()).some((k) => k === key));
  }, [store]);

  return isLoaded ? <Provider store={store}>{children}</Provider> : null;
};
