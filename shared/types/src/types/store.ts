import { createInjectedMiddleware, createReducerManager } from '@fake-company/utils';
import { EnhancedStore } from '@reduxjs/toolkit';

export type InjectStore = EnhancedStore & {
  asyncReducers: any;
  reducerManager: ReturnType<typeof createReducerManager>;
  middlewareManager: ReturnType<typeof createInjectedMiddleware>;
};
