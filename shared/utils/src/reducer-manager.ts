import { Reducer, Store, combineReducers } from '@reduxjs/toolkit';

export const createReducerManager = (store: Store, initialReducers: { [key: string]: Reducer }) => {
  const reducers = { ...initialReducers };
  let keysToRemove: string[] = [];

  const add = (key: string, reducer: Reducer) => {
    reducers[key] = reducer;
    store.replaceReducer(combineReducers(reducers));
  };

  const remove = (key: string) => {
    if (!reducers[key]) {
      return;
    }

    delete reducers[key];
    keysToRemove.push(key);
    store.replaceReducer(combineReducers(reducers));
  };

  return {
    add,
    remove
  };
};
