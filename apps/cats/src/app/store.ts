import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

const createStore = (initialState?: any) => {
  const store = configureStore({ reducer: createReducer(), preloadedState: initialState }) as any;

  store.asyncReducers = {};

  store.injectReducer = (key: string | number, asyncReducer: Reducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
};

const createReducer = (asyncReducers?: Reducer) => combineReducers({ ...asyncReducers });

export const store = createStore();
