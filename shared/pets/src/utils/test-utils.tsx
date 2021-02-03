import React from 'react';
import { act, render as rtlRender, RenderOptions } from '@testing-library/react';
import { configureStore, DeepPartial, Dispatch } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { petsRootReducer } from '../common/reducer';
import { Provider } from 'react-redux';
import { RootState, store as origStore } from '../common/reducer';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

function configureTestStore(initialState: DeepPartial<RootState> = {}) {
  const store = configureStore({ reducer: petsRootReducer, preloadedState: initialState });
  const origDispatch = store.dispatch as jest.Mock;

  store.dispatch = jest.fn(origDispatch);
  origStore.getState = () => store.getState();

  return store;
}

type Params = {
  initialState: DeepPartial<RootState>;
  initialEntries?: string[];
  store?: ReturnType<typeof configureTestStore>;
} & RenderOptions;

export function renderWithProviders(
  ui: React.ReactElement,
  { initialState, initialEntries, store = configureTestStore(initialState), ...renderOptions }: Params
) {
  const history = createMemoryHistory({ initialEntries });
  const Wrapper: React.FC = ({ children }) => (
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

export const HooksWrapper: React.FC = ({ children }) => <Provider store={configureTestStore()}>{children}</Provider>;

export * from '@testing-library/react';
