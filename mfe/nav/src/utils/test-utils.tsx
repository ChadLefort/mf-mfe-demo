import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

type Params = {
  initialEntries?: string[];
} & RenderOptions;

export function renderWithRouter(ui: React.ReactElement, { initialEntries, ...renderOptions }: Params) {
  const history = createMemoryHistory({ initialEntries });
  const Wrapper: React.FC = ({ children }) => <Router history={history}>{children}</Router>;

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    history
  };
}

export * from '@testing-library/react';
