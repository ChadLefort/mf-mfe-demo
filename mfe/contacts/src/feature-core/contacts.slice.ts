import { IContact, ContactType } from '@fake-company/types';
import { State as CommonState, condition, error, isFetching } from '@fake-company/utils';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stringify } from 'qs';

import { RootState } from '../app/reducer';

const name = 'mfe/contacts/core';

export const fetchContacts = createAsyncThunk(
  `${name}/fetchContacts`,
  async (type: ContactType[]) => {
    const { data } = await axios.get<IContact[]>('/api/contacts', {
      params: { type },
      paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' })
    });

    return data;
  },
  { condition: condition('contacts') }
);

export const addContact = createAsyncThunk(`${name}/addContact`, async (contact: IContact) => {
  const { data } = await axios.post<IContact>('/api/contacts', contact);
  return data;
});

export const updateContact = createAsyncThunk(`${name}/updateContact`, async (contact: IContact) => {
  const { data } = await axios.put<IContact>(`/api/contacts/${contact.id}`, contact);
  return data;
});

export const removeContact = createAsyncThunk(`${name}/removeContacts`, async (id: string) => {
  await axios.delete(`/api/contacts/${id}`);
  return id;
});

export const contactsAdapter = createEntityAdapter<IContact>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const contactsSelectors = contactsAdapter.getSelectors<RootState>((state) => state.contacts.core);

type State = CommonState;

export const initialState = contactsAdapter.getInitialState<State>({
  isFetching: false,
  error: null
});

const contacts = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, isFetching)
      .addCase(addContact.pending, isFetching)
      .addCase(updateContact.pending, isFetching)
      .addCase(removeContact.pending, isFetching)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.setAll(state, action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.removeOne(state, action.payload);
      })
      .addCase(fetchContacts.rejected, error)
      .addCase(addContact.rejected, error)
      .addCase(updateContact.rejected, error)
      .addCase(removeContact.rejected, error);
  }
});

export const { reducer: contactsReducer } = contacts;
