import { ContactType, contactsFixture } from '@fake-company/types';
import { waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithProviders, screen } from '../../utils/test-utils';
import { ViewContact } from './ViewContact';

const axiosMock = new MockAdapter(axios);

describe('view contact', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('can show a loading bar and then a contact', async () => {
    axiosMock.onGet('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(
      200,
      contactsFixture.find(({ id }) => id === '89222b2d-8d06-41ff-82cf-c989dd90de24')
    );

    renderWithProviders(<Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />, {
      initialEntries: ['/89222b2d-8d06-41ff-82cf-c989dd90de24']
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(contactsFixture[0].name)).toHaveTextContent(contactsFixture[0].name);
  });
});
