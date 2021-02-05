import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchContacts, initialState, removeContact } from '../contacts.slice';
import { getActionResult, renderWithProviders, screen } from '../../../utils/test-utils';
import { IContact, contactsFixture, ContactType } from '@fake-company/types';
import { ViewContacts } from './ViewContacts';

const axiosMock = new MockAdapter(axios);

describe('view contacts', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  afterEach(cleanup);

  it('can show a loading bar and then contacts', async () => {
    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);

    const { store } = renderWithProviders(<ViewContacts type={ContactType.Customer} />, {
      initialState: { contacts: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(contactsFixture[0].name)).toHaveTextContent(contactsFixture[0].name);

    const { type } = await getActionResult<IContact[]>(store.dispatch);
    expect(type).toEqual(fetchContacts.fulfilled.type);
  });

  it('can show a loading bar and an error icon', async () => {
    axiosMock.onGet('/api/contacts').reply(500);

    const { store } = renderWithProviders(<ViewContacts type={ContactType.Customer} />, {
      initialState: { contacts: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();

    const { type } = await getActionResult<IContact[]>(store.dispatch);
    expect(type).toEqual(fetchContacts.rejected.type);
  });

  it('allows you to delete a contact', async () => {
    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);
    axiosMock.onDelete(`/api/contacts/${contactsFixture[1].id}`).reply(200);

    const { store } = renderWithProviders(<ViewContacts type={ContactType.Customer} />, {
      initialState: { contacts: { core: initialState } }
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    fireEvent.click(screen.getByTestId(`${contactsFixture[1].name}-delete`));

    expect(screen.queryByText(contactsFixture[1].name)).toBeNull();

    const { type } = await getActionResult(store.dispatch, 1);
    expect(type).toEqual(removeContact.fulfilled.type);
  });
});
