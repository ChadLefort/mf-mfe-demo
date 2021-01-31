import { InjectStore } from '@pet-tracker/types';
import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

const createStore = (initialState?: any) => {
  const store = configureStore({ reducer: createReducer(), preloadedState: initialState }) as InjectStore;

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
};

const createReducer = (asyncReducers?: Reducer) => combineReducers({ ...asyncReducers });

export const store = createStore();
