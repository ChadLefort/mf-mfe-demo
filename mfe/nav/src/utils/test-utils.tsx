import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { FC, ReactElement } from 'react';
import { Router } from 'react-router-dom';

type Params = {
  initialEntries?: string[];
} & RenderOptions;

export function renderWithRouter(ui: ReactElement, { initialEntries, ...renderOptions }: Params) {
  const history = createMemoryHistory({ initialEntries });
  const Wrapper: FC = ({ children }) => <Router history={history}>{children}</Router>;

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    history
  };
}

export * from '@testing-library/react';
