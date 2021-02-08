import axios from 'axios';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import { addContact, contactsReducer, fetchContacts, initialState, removeContact } from './contacts.slice';
import { contactsFixture, ContactType, IContact } from '@fake-company/types';
import { RootState } from '../app/reducer';

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

    await store.dispatch(fetchContacts([ContactType.Customer]));

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchContacts.pending.type);
    expect(actions[1].payload).toEqual(contactsFixture);
  });

  it('dipatches a failure action for a 404 with a payload', async () => {
    axiosMock.onGet('/api/contacts').reply(404);
    await store.dispatch(fetchContacts([ContactType.Customer]));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchContacts.rejected.type);
  });

  it('dipatches a failure action', async () => {
    axiosMock.onGet('/api/contacts').reply(500);
    await store.dispatch(fetchContacts([ContactType.Customer]));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchContacts.rejected.type);
    expect(actions[1].error.message).toEqual('Request failed with status code 500');
  });
});

describe('contacts reducer', () => {
  test('mfe/contacts/core/fetchContacts/pending', () => {
    const nextState = contactsReducer(prevState, fetchContacts.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/fetchContacts/fulfilled', () => {
    const nextState = contactsReducer(prevState, fetchContacts.fulfilled(contactsFixture, '', [ContactType.Customer])); // second param requestID?

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(contactsFixture.sort((a, b) => a.name.localeCompare(b.name)));
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/fetchContacts/rejected', () => {
    const nextState = contactsReducer(prevState, fetchContacts.rejected(error, '', [ContactType.Customer]));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('mfe/contacts/core/addContact/pending', () => {
    const nextState = contactsReducer(prevState, addContact.pending);

    expect(prevState.isFetching).toBeFalsy();
    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/addContact/fulfilled', () => {
    prevState = contactsReducer(prevState, fetchContacts.fulfilled(contactsFixture, '', [ContactType.Customer]));

    const newContact: IContact = {
      id: '8ee4eca1-c441-4cdb-8720-b2003d183568',
      name: 'Chad',
      rating: 4,
      type: ContactType.Customer
    };

    const nextState = contactsReducer(prevState, addContact.fulfilled(newContact, '', newContact));

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)).toEqual(contactsFixture.concat(newContact));
    expect(nextState.error).toBeNull();
  });

  test('mfe/contacts/core/removeContact/rejected', () => {
    const nextState = contactsReducer(prevState, fetchContacts.rejected(error, '', [ContactType.Customer]));

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });

  test('mfe/contacts/core/removeContact/fulfilled', () => {
    prevState = contactsReducer(prevState, fetchContacts.fulfilled(contactsFixture, '', [ContactType.Customer]));

    const nextState = contactsReducer(
      prevState,
      removeContact.fulfilled('89222b2d-8d06-41ff-82cf-c989dd90de24', '', 'fd546b4e-747d-448f-abaf-b0d119bae119')
    );

    expect(nextState.isFetching).toBeFalsy();
    expect(Object.values(nextState.entities)[0]).not.toEqual(
      contactsFixture.sort((a, b) => a.name.localeCompare(b.name))[0]
    );
    expect(nextState.error).toBeNull();
  });
});
