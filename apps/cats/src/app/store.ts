import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { InjectStore } from '@pet-tracker/types';

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
