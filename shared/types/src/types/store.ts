import { EnhancedStore, Reducer } from '@reduxjs/toolkit';

export type InjectStore = EnhancedStore & {
  asyncReducers: any;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
};
