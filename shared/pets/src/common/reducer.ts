import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';

import { petsReducer } from '../features/core/pets.slice';

export const petsRootReducer = {
  pets: petsReducer
};

// just for types and test
export const store = configureStore({ reducer: petsRootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();
