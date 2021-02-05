import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HooksWrapper } from '../../../utils/test-utils';
import { contactsFixture, ContactType } from '@fake-company/types';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchContacts } from './useFetchContacts';

const axiosMock = new MockAdapter(axios);

describe('useFetchContacts hook', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('calls dispatch and retrieves contacts', async () => {
    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);

    const { result, waitForNextUpdate } = renderHook(() => useFetchContacts(ContactType.Cat), {
      wrapper: HooksWrapper
    });

    expect(result.current.isFetching).toBeTruthy();
    expect(result.current.contacts).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.isFetching).toBeFalsy();
    expect(Object.values(result.current.contacts)).toEqual(
      contactsFixture.sort((a, b) => a.name.localeCompare(b.name))
    );
  });
});
