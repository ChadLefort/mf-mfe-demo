import React, { useEffect, useState } from 'react';
import { petsReducer } from '../pets.slice';
import { Provider } from 'react-redux';

type Props = {
  store: any;
};

export const RemoteWrapper: React.FC<Props> = ({ store, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const key = 'pets';

  useEffect(() => {
    store.injectReducer(key, petsReducer);
  }, [store]);

  useEffect(() => {
    setIsLoaded(Object.keys(store.getState()).some((k) => k === key));
  }, [store]);

  return isLoaded ? <Provider store={store}>{children}</Provider> : null;
};
