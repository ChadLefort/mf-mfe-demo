import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchPets, initialState, removePet } from '../pets.slice';
import { getActionResult, renderWithProviders, screen } from '../../../utils/test-utils';
import { IPet, petsFixture, PetType } from '@pet-tracker/types';
import { ViewPets } from './ViewPets';

const axiosMock = new MockAdapter(axios);

describe('view pets', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  afterEach(cleanup);

  it('can show a loading bar and then pets', async () => {
    axiosMock.onGet('/api/pets').reply(200, petsFixture);

    const { store } = renderWithProviders(<ViewPets type={PetType.Cat} />, {
      initialState: { pets: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(petsFixture[0].name)).toHaveTextContent(petsFixture[0].name);

    const { type } = await getActionResult<IPet[]>(store.dispatch);
    expect(type).toEqual(fetchPets.fulfilled.type);
  });

  it('can show a loading bar and an error icon', async () => {
    axiosMock.onGet('/api/pets').reply(500);

    const { store } = renderWithProviders(<ViewPets type={PetType.Cat} />, {
      initialState: { pets: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();

    const { type } = await getActionResult<IPet[]>(store.dispatch);
    expect(type).toEqual(fetchPets.rejected.type);
  });

  it('allows you to delete a pet', async () => {
    axiosMock.onGet('/api/pets').reply(200, petsFixture);
    axiosMock.onDelete(`/api/pets/${petsFixture[1].id}`).reply(200);

    const { store } = renderWithProviders(<ViewPets type={PetType.Cat} />, {
      initialState: { pets: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    fireEvent.click(screen.getByTestId(`${petsFixture[1].name}-delete`));

    expect(screen.queryByText(petsFixture[1].name)).toBeNull();

    const { type } = await getActionResult(store.dispatch, 1);
    expect(type).toEqual(removePet.fulfilled.type);
  });
});
