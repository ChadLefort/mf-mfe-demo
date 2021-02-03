import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HooksWrapper } from '../../../utils/test-utils';
import { petsFixture, PetType } from '@pet-tracker/types';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchPets } from './useFetchPets';

const axiosMock = new MockAdapter(axios);

describe('useFetchPets hook', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('calls dispatch and retrieves pets', async () => {
    axiosMock.onGet('/api/pets').reply(200, petsFixture);

    const { result, waitForNextUpdate } = renderHook(() => useFetchPets(PetType.Cat), {
      wrapper: HooksWrapper
    });

    expect(result.current.isFetching).toBeTruthy();
    expect(result.current.pets).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.isFetching).toBeFalsy();
    expect(Object.values(result.current.pets)).toEqual(petsFixture.sort((a, b) => a.name.localeCompare(b.name)));
  });
});
