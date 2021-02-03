import axios from 'axios';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { addPet, fetchPets, initialState, petsReducer, removePet } from './pets.slice';
import { DeepPartial, Action, ThunkDispatch } from '@reduxjs/toolkit';
import { IPet, petsFixture, PetType } from '@pet-tracker/types';
import { RootState } from '../../common/reducer';

const mockStore = configureStore<
  DeepPartial<RootState>,
  ThunkDispatch<DeepPartial<RootState>, unknown, Action<string>>
>([thunk]);
const store = mockStore({ pets: { core: initialState } });
let prevState: typeof initialState;
const axiosMock = new MockAdapter(axios);
const error = new Error('test error');

beforeEach(() => {
  axiosMock.reset();
  store.clearActions();
  prevState = initialState;
});

describe('pets actions', () => {
  it('dipatches a success action when fetching pets', async () => {
    axiosMock.onGet('/api/pets').reply(200, petsFixture);

    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchPets.pending.type);
    expect(actions[1].payload).toEqual(petsFixture);
  });

  it('dipatches a failure action for a 404 with a payload', async () => {
    axiosMock.onGet('/api/pets').reply(404);
    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchPets.rejected.type);
  });

  it('dipatches a failure action', async () => {
    axiosMock.onGet('/api/pets').reply(500);
    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchPets.rejected.type);
    expect(actions[1].error.message).toEqual('Request failed with status code 500');
  });
});

describe('pets reducer', () => {
  test('remote/shared_pets/core/fetchPets/pending', () => {
    const nextState = petsReducer(prevState, fetchPets.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('remote/shared_pets/core/fetchPets/fulfilled', () => {
    const nextState = petsReducer(prevState, fetchPets.fulfilled(petsFixture, '', PetType.Cat)); // second param requestID?

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(petsFixture.sort((a, b) => a.name.localeCompare(b.name)));
    expect(nextState.error).toBeNull();
  });

  test('remote/shared_pets/core/fetchPets/rejected', () => {
    const nextState = petsReducer(prevState, fetchPets.rejected(error, '', PetType.Cat));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('remote/shared_pets/core/addPet/pending', () => {
    const nextState = petsReducer(prevState, addPet.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('remote/shared_pets/core/addPet/fulfilled', () => {
    prevState = petsReducer(prevState, fetchPets.fulfilled(petsFixture, '', PetType.Cat));

    const newPet: IPet = {
      id: '8ee4eca1-c441-4cdb-8720-b2003d183568',
      name: 'PT',
      age: '12',
      type: PetType.Cat
    };

    const nextState = petsReducer(prevState, addPet.fulfilled(newPet, '', newPet));

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(petsFixture.concat(newPet));
    expect(nextState.error).toBeNull();
  });

  test('remote/shared_pets/core/removePet/rejected', () => {
    const nextState = petsReducer(prevState, fetchPets.rejected(error, '', PetType.Cat));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('remote/shared_pets/core/removePet/fulfilled', () => {
    prevState = petsReducer(prevState, fetchPets.fulfilled(petsFixture, '', PetType.Cat));

    const nextState = petsReducer(
      prevState,
      removePet.fulfilled('fd546b4e-747d-448f-abaf-b0d119bae119', '', 'fd546b4e-747d-448f-abaf-b0d119bae119')
    );

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)[0]).not.toEqual(
      petsFixture.sort((a, b) => a.name.localeCompare(b.name))[0]
    );
    expect(nextState.error).toBeNull();
  });
});
