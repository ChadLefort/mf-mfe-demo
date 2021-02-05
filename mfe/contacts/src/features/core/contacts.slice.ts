import { IPet, PetType } from '@fake-company/types';
import { State as CommonState, condition, error, isFetching } from '@fake-company/utils';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../common/reducer';

const name = 'mfe/contacts/core';

export const fetchPets = createAsyncThunk(
  `${name}/fetchPets`,
  async (type: PetType) => {
    const { data } = await axios.get<IPet[]>('/api/contacts', {
      params: { type }
    });

    return data;
  },
  { condition: condition('contacts') }
);

export const addPet = createAsyncThunk(`${name}/addPet`, async (pet: IPet) => {
  const { data } = await axios.post<IPet>('/api/contacts', pet);
  return data;
});

export const updatePet = createAsyncThunk(`${name}/updatePet`, async (pet: IPet) => {
  const { data } = await axios.put<IPet>(`/api/contacts/${pet.id}`, pet);
  return data;
});

export const removePet = createAsyncThunk(`${name}/removePets`, async (id: string) => {
  await axios.delete(`/api/contacts/${id}`);
  return id;
});

export const contactsAdapter = createEntityAdapter<IPet>({
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
      .addCase(fetchPets.pending, isFetching)
      .addCase(addPet.pending, isFetching)
      .addCase(updatePet.pending, isFetching)
      .addCase(removePet.pending, isFetching)
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.setAll(state, action.payload);
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.isFetching = false;
        contactsAdapter.removeOne(state, action.payload);
      })
      .addCase(fetchPets.rejected, error)
      .addCase(addPet.rejected, error)
      .addCase(updatePet.rejected, error)
      .addCase(removePet.rejected, error);
  }
});

export const { reducer: contactsReducer } = contacts;
