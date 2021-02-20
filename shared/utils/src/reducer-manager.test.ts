import { InjectStore } from '@fake-company/types';
import { AnyAction, configureStore } from '@reduxjs/toolkit';

import { createReducerManager } from './reducer-manager';

const firstReducer = (state = {}, action: AnyAction) => {
  if (action.type === 'foo') return { foo: 'bar' };
  return state;
};

const secondReducer = (state = {}, action: AnyAction) => {
  if (action.type === 'bar') return { bar: 'baz' };
  return state;
};

const staticReducers = {
  foo: firstReducer
};

describe('reducer manager', () => {
  it('should allow redux to still work', () => {
    const store = configureStore({ reducer: staticReducers }) as InjectStore;
    const reducerManager = createReducerManager(store, staticReducers);

    store.reducerManager = reducerManager;

    expect(store.getState()).toEqual({ foo: {} });

    store.dispatch({ type: 'foo' });

    expect(store.getState()).toEqual({ foo: { foo: 'bar' } });
  });

  it('should allow you to add a reducer', () => {
    const store = configureStore({ reducer: staticReducers }) as InjectStore;
    const reducerManager = createReducerManager(store, staticReducers);

    store.reducerManager = reducerManager;

    expect(store.getState()).toEqual({ foo: {} });

    store.reducerManager.add('bar', secondReducer);

    expect(store.getState()).toEqual({ foo: {}, bar: {} });

    store.dispatch({ type: 'bar' });

    expect(store.getState()).toEqual({ foo: {}, bar: { bar: 'baz' } });
  });

  it('should allow you to remove a reducer by key', () => {
    const store = configureStore({ reducer: staticReducers }) as InjectStore;
    const reducerManager = createReducerManager(store, staticReducers);

    store.reducerManager = reducerManager;

    expect(store.getState()).toEqual({ foo: {} });

    store.reducerManager.add('bar', secondReducer);

    expect(store.getState()).toEqual({ foo: {}, bar: {} });

    store.reducerManager.remove('bar');

    expect(store.getState()).toEqual({ foo: {} });
  });

  it('should do no nothing if the key does not exist', () => {
    const store = configureStore({ reducer: staticReducers }) as InjectStore;
    const reducerManager = createReducerManager(store, staticReducers);

    store.reducerManager = reducerManager;

    expect(store.getState()).toEqual({ foo: {} });

    store.reducerManager.add('bar', secondReducer);

    expect(store.getState()).toEqual({ foo: {}, bar: {} });

    store.reducerManager.remove('baz');

    expect(store.getState()).toEqual({ foo: {}, bar: {} });
  });
});
