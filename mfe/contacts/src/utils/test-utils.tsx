import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { DeepPartial, Dispatch, configureStore } from '@reduxjs/toolkit';
import { RenderOptions, act, render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { contactsRootReducer } from '../app/reducer';
import { RootState, store as origStore } from '../app/reducer';

function configureTestStore(initialState: DeepPartial<RootState> = {}) {
  const store = configureStore({ reducer: contactsRootReducer, preloadedState: initialState });
  const origDispatch = store.dispatch as jest.Mock;

  store.dispatch = jest.fn(origDispatch);
  origStore.getState = () => store.getState();

  return store;
}

type Params = {
  initialState?: DeepPartial<RootState>;
  initialEntries?: string[];
  store?: ReturnType<typeof configureTestStore>;
} & RenderOptions;

export function renderWithProviders(
  ui: ReactElement,
  { initialState, initialEntries, store = configureTestStore(initialState), ...renderOptions }: Params
) {
  const history = createMemoryHistory({ initialEntries });
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
    history
  };
}

export async function actWithReturn<T = typeof origStore>(callback: () => unknown) {
  let ret;

  await act(async () => {
    ret = await callback();
  });

  return (ret as unknown) as T;
}

export async function getActionResult<T = unknown>(dispatch: Dispatch, action = 0) {
  const mockDispatch = dispatch as jest.Mock;
  return (await mockDispatch.mock.results[action].value) as {
    type: string;
    payload?: T;
  };
}

export async function getQueryActionResult<T = unknown>(dispatch: Dispatch, action = 0) {
  const mockDispatch = dispatch as jest.Mock;
  const { data } = await mockDispatch.mock.results[action].value;
  return data as T;
}

export const HooksWrapper: FC = ({ children }) => <Provider store={configureTestStore()}>{children}</Provider>;

export * from '@testing-library/react';
