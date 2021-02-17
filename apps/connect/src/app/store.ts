import { authRootReducer } from '@fake-company/auth';
import { InjectStore } from '@fake-company/types';
import { createReducerManager, injectedMiddleware, middlewareManager } from '@fake-company/utils';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';

const staticReducers = {
  ...authRootReducer
};

const createStore = (initialState?: any) => {
  const store = configureStore({
    reducer: staticReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(injectedMiddleware)
  }) as InjectStore;

  const reducerManager = createReducerManager(store, staticReducers);

  store.reducerManager = reducerManager;
  store.middlewareManager = middlewareManager;

  return store;
};

export const store = createStore();

setupListeners(store.dispatch);
