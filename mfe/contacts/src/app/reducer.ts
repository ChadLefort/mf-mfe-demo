import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { createSelectorHook, useDispatch } from 'react-redux';

import { contactsApi } from '../feature-core/contacts.api';

export const contactsRootReducer = {
  [contactsApi.reducerPath]: contactsApi.reducer
};

// just for types and test
export const store = configureStore({
  reducer: contactsRootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();
