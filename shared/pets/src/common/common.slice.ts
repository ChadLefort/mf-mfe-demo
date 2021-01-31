import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

export type State = {
  isFetching: boolean;
  error: SerializedError | null;
};

export const isFetching = <T extends State>(state: T) => {
  state.isFetching = true;
  state.error = null;
};

export const error = <T>(
  state: State,
  action: PayloadAction<
    unknown,
    string,
    { arg: T; requestId: string; aborted: boolean; condition: boolean },
    SerializedError
  >
) => {
  state.isFetching = false;
  state.error = action.error;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const condition = (state: string) => (_: never, { getState }: any) => {
  const selectState = getState()[state];

  if (Object.prototype.hasOwnProperty.call(selectState, 'isFetching')) {
    const { isFetching } = selectState as State;
    return !isFetching;
  }

  return undefined;
};
