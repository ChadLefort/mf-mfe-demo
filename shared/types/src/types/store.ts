import { EnhancedStore, Reducer, Middleware } from '@reduxjs/toolkit';

export type InjectStore = EnhancedStore & {
  asyncReducers: any;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
  injectMiddleware: (asyncMiddleware: Middleware) => void;
};
