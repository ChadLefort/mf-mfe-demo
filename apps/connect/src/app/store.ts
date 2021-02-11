import { authRootReducer } from '@fake-company/auth';
import { InjectStore } from '@fake-company/types';
import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { injectedMiddleware, addMiddleware } from '@fake-company/utils';

const staticReducers = {
  ...authRootReducer
};

const createStore = (initialState?: any) => {
  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(injectedMiddleware)
  }) as InjectStore;

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  store.injectMiddleware = (asyncMiddleware) => {
    addMiddleware(asyncMiddleware);
  };

  return store;
};

const createReducer = (asyncReducers?: Reducer) => combineReducers({ ...staticReducers, ...asyncReducers });

export const store = createStore();
