import { ContactType, IContact } from '@fake-company/types';
import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

import { actWithReturn, getQueryActionResult, renderWithProviders } from '../../utils/test-utils';
import { AddContacts } from './AddContacts';

const axiosMock = new MockAdapter(axios);

describe('add contacts', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch contacts/addContact action when form is submitted', async () => {
    const newContact = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Chad',
      rating: 5,
      type: ContactType.Customer
    };

    axiosMock.onPost('/api/contacts').reply(200, newContact);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(<AddContacts type={[ContactType.Customer]} />, {});

      fireEvent.change(screen.getByTestId('name'), {
        target: { value: 'Chad' }
      });

      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const data = await getQueryActionResult<IContact>(store.dispatch);

    expect(data).toEqual(newContact);
  });
});
