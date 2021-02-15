import { DeepPartial, Reducer, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export function withProvider<T, R extends Reducer = any>(
  rootReducer: R,
  initialState?: DeepPartial<T>,
  store = configureStore({ reducer: rootReducer, preloadedState: initialState })
) {
  return (story: () => ReactNode) => <Provider store={store}>{story()}</Provider>;
}

export const withRouter = (initialEntries?: string[]) => (story: () => ReactNode) => (
  <MemoryRouter initialEntries={initialEntries}>{story()}</MemoryRouter>
);
export const withMock = (mock: (adapter: MockAdapter) => void) => (story: () => ReactNode) => {
  const apiMock = new MockAdapter(axios);

  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });

  return story();
};
