import { ContactType, contactsFixture } from '@fake-company/types';
import { cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

import { renderWithProviders, screen } from '../../utils/test-utils';
import { ViewContacts } from './ViewContacts';

const axiosMock = new MockAdapter(axios);

describe('view contacts', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  afterEach(cleanup);

  it('can show a loading bar and then contacts', async () => {
    axiosMock.onGet('/api/contacts?type=Customer').reply(200, contactsFixture);

    renderWithProviders(<ViewContacts type={[ContactType.Customer]} />, {});

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(contactsFixture[0].name)).toHaveTextContent(contactsFixture[0].name);
  });
});
