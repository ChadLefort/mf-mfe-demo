import axios from 'axios';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { addPet, fetchPets, initialState, contactsReducer, removePet } from './contacts.slice';
import { DeepPartial, Action, ThunkDispatch } from '@reduxjs/toolkit';
import { IPet, contactsFixture, PetType } from '@fake-company/types';
import { RootState } from '../../common/reducer';

const mockStore = configureStore<
  DeepPartial<RootState>,
  ThunkDispatch<DeepPartial<RootState>, unknown, Action<string>>
>([thunk]);
const store = mockStore({ contacts: { core: initialState } });
let prevState: typeof initialState;
const axiosMock = new MockAdapter(axios);
const error = new Error('test error');

beforeEach(() => {
  axiosMock.reset();
  store.clearActions();
  prevState = initialState;
});

describe('contacts actions', () => {
  it('dipatches a success action when fetching contacts', async () => {
    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);

    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchPets.pending.type);
    expect(actions[1].payload).toEqual(contactsFixture);
  });

  it('dipatches a failure action for a 404 with a payload', async () => {
    axiosMock.onGet('/api/contacts').reply(404);
    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchPets.rejected.type);
  });

  it('dipatches a failure action', async () => {
    axiosMock.onGet('/api/contacts').reply(500);
    await store.dispatch(fetchPets(PetType.Cat));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchPets.rejected.type);
    expect(actions[1].error.message).toEqual('Request failed with status code 500');
  });
});

describe('contacts reducer', () => {
  test('mfe/contacts/core/fetchPets/pending', () => {
    const nextState = contactsReducer(prevState, fetchPets.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/fetchPets/fulfilled', () => {
    const nextState = contactsReducer(prevState, fetchPets.fulfilled(contactsFixture, '', PetType.Cat)); // second param requestID?

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(contactsFixture.sort((a, b) => a.name.localeCompare(b.name)));
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/fetchPets/rejected', () => {
    const nextState = contactsReducer(prevState, fetchPets.rejected(error, '', PetType.Cat));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('mfe/contacts/core/addPet/pending', () => {
    const nextState = contactsReducer(prevState, addPet.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/addPet/fulfilled', () => {
    prevState = contactsReducer(prevState, fetchPets.fulfilled(contactsFixture, '', PetType.Cat));

    const newPet: IPet = {
      id: '8ee4eca1-c441-4cdb-8720-b2003d183568',
      name: 'PT',
      age: '12',
      type: PetType.Cat
    };

    const nextState = contactsReducer(prevState, addPet.fulfilled(newPet, '', newPet));

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(contactsFixture.concat(newPet));
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/removePet/rejected', () => {
    const nextState = contactsReducer(prevState, fetchPets.rejected(error, '', PetType.Cat));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('mfe/contacts/core/removePet/fulfilled', () => {
    prevState = contactsReducer(prevState, fetchPets.fulfilled(contactsFixture, '', PetType.Cat));

    const nextState = contactsReducer(
      prevState,
      removePet.fulfilled('fd546b4e-747d-448f-abaf-b0d119bae119', '', 'fd546b4e-747d-448f-abaf-b0d119bae119')
    );

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)[0]).not.toEqual(
      contactsFixture.sort((a, b) => a.name.localeCompare(b.name))[0]
    );
    expect(nextState.error).toBeNull();
  });
});
