import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { actWithReturn, getActionResult, renderWithProviders } from '../../../utils/test-utils';
import { DeepPartial } from '@reduxjs/toolkit';
import { EditPet } from './EditPet';
import { fireEvent, screen } from '@testing-library/react';
import { IPet, petsFixture, PetType } from '@pet-tracker/types';
import { RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { updatePet } from '../pets.slice';

const axiosMock = new MockAdapter(axios);
const initialState: DeepPartial<RootState> = {
  pets: {
    core: {
      ids: ['89222b2d-8d06-41ff-82cf-c989dd90de24'],
      entities: {
        '89222b2d-8d06-41ff-82cf-c989dd90de24': {
          id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
          name: 'Pat',
          age: '7',
          type: PetType.Cat
        }
      },
      isFetching: false,
      error: null
    }
  }
};

describe('edit pet', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch pets/updatePet action when form is submitted', async () => {
    const updatedPet: IPet = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Pat',
      age: '8',
      type: PetType.Cat
    };

    axiosMock.onGet('/api/pets').reply(200, petsFixture);
    axiosMock.onPut('/api/pets/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(200, updatedPet);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(<Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />, {
        initialState,
        initialEntries: ['/edit/89222b2d-8d06-41ff-82cf-c989dd90de24']
      });

      fireEvent.change(screen.getByTestId('age'), { target: { value: '8' } });
      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const { type, payload } = await getActionResult<IPet>(store.dispatch, 1);

    expect(type).toEqual(updatePet.fulfilled.type);
    expect(payload).toEqual(updatedPet);
  });
});
