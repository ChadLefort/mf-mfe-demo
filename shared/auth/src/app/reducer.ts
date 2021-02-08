import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../feature-core/auth.slice';
import { createSelectorHook, useDispatch } from 'react-redux';

export const authRootReducer = {
  auth: combineReducers({ core: authReducer })
};

// just for types and test
export const store = configureStore({ reducer: authRootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();
