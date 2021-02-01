import { State as CommonState, error, isFetching } from '@pet-tracker/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const name = 'lib/auth/core';

export const axiosInterceptor = (ssoToken: string, rejectWithValue: (error: AxiosError) => void) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.common.Authorization = `Bearer ${ssoToken}`;
      return config;
    },
    (error: AxiosError) => rejectWithValue(error)
  );
};

export const fetchAuthToken = createAsyncThunk(`${name}/fetchToken`, async (_, { rejectWithValue }) => {
  const { data } = await axios.get<{ ssoToken: string }>('/api/auth');

  axiosInterceptor(data.ssoToken, (error) => rejectWithValue(error));

  return data.ssoToken;
});

type State = { ssoToken: string | null } & CommonState;

export const initialState: State = {
  isFetching: false,
  ssoToken: null,
  error: null
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, isFetching)
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.isFetching = false;
        state.ssoToken = action.payload;
      })
      .addCase(fetchAuthToken.rejected, error);
  }
});

export const { reducer: authReducer } = authSlice;
