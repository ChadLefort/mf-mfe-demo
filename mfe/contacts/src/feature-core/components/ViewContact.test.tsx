import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { fetchContacts, initialState } from '../contacts.slice';
import { getActionResult, renderWithProviders, screen } from '../../utils/test-utils';
import { contactsFixture, ContactType } from '@fake-company/types';
import { Route } from 'react-router-dom';
import { ViewContact } from './ViewContact';
import { waitForElementToBeRemoved } from '@testing-library/react';

const axiosMock = new MockAdapter(axios);

describe('view contact', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('can show a loading bar and then a contact', async () => {
    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);

    const { store } = renderWithProviders(
      <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />,
      {
        initialState: { contacts: { core: initialState } },
        initialEntries: ['/89222b2d-8d06-41ff-82cf-c989dd90de24']
      }
    );

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(contactsFixture[0].name)).toHaveTextContent(contactsFixture[0].name);

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchContacts.fulfilled.type);
  });

  it('can show a loading bar and then an error', async () => {
    axiosMock.onGet('/api/contacts').reply(500);

    const { store } = renderWithProviders(
      <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />,
      {
        initialState: { contacts: { core: initialState } },
        initialEntries: ['/89222b2d-8d06-41ff-82cf-c989dd90de24']
      }
    );

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchContacts.rejected.type);
  });
});
