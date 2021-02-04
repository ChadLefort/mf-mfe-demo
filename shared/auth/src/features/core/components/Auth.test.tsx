import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { fetchAuthToken, initialState } from '../auth.slice';
import { getActionResult, renderWithProviders, screen } from '../../../utils/test-utils';
import { authFixture } from '@pet-tracker/types';
import { Route } from 'react-router-dom';
import { Auth } from './Auth';
import { waitForElementToBeRemoved } from '@testing-library/react';

const axiosMock = new MockAdapter(axios);

describe('auth', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('can show a loading bar and then a success message', async () => {
    axiosMock.onGet('/api/auth').reply(200, authFixture);

    const loginSuccess = 'Authenticated!';
    const { store } = renderWithProviders(
      <Route
        path="/"
        render={() => (
          <Auth>
            <p>{loginSuccess}</p>
          </Auth>
        )}
      />,
      {
        initialState: { auth: { core: initialState } }
      }
    );

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(loginSuccess)).toHaveTextContent(loginSuccess);

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchAuthToken.fulfilled.type);
  });

  it('can show a loading bar and then an error', async () => {
    axiosMock.onGet('/api/auth').reply(500);

    const { store } = renderWithProviders(
      <Route
        path="/"
        render={() => (
          <Auth>
            <p>Authenticated!</p>
          </Auth>
        )}
      />,
      {
        initialState: { auth: { core: initialState } }
      }
    );

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchAuthToken.rejected.type);
  });
});
