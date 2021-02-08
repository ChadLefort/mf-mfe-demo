import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { contactsReducer } from '../feature-core/contacts.slice';
import { createSelectorHook, useDispatch } from 'react-redux';

export const injectableReducer = combineReducers({ core: contactsReducer });

export const contactsRootReducer = {
  contacts: injectableReducer
};

// just for types and test
export const store = configureStore({ reducer: contactsRootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();
