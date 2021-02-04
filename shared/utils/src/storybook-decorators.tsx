import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, { useEffect } from 'react';
import { configureStore, DeepPartial, Reducer } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export function withProvider<T, R extends Reducer = any>(
  rootReducer: R,
  initialState?: DeepPartial<T>,
  store = configureStore({ reducer: rootReducer, preloadedState: initialState })
) {
  return (story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>;
}

export const withRouter = (initialEntries?: string[]) => (story: () => React.ReactNode) => (
  <MemoryRouter initialEntries={initialEntries}>{story()}</MemoryRouter>
);
export const withMock = (mock: (adapter: MockAdapter) => void) => (story: () => React.ReactNode) => {
  const apiMock = new MockAdapter(axios);

  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });

  return story();
};
