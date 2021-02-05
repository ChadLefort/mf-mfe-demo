import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { actWithReturn, getActionResult, renderWithProviders } from '../../../utils/test-utils';
import { addContact, initialState } from '../contacts.slice';
import { AddContacts } from './AddContacts';
import { fireEvent, screen } from '@testing-library/react';
import { IContact, ContactType } from '@fake-company/types';

const axiosMock = new MockAdapter(axios);

describe('add contacts', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch contacts/addContact action when form is submitted', async () => {
    const newContact: IContact = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Pat',
      age: '7',
      type: ContactType.Cat
    };

    axiosMock.onPost('/api/contacts').reply(200, newContact);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(<AddContacts type={ContactType.Cat} />, {
        initialState: { contacts: { core: initialState } }
      });

      fireEvent.change(screen.getByTestId('name'), {
        target: { value: 'Pat' }
      });
      fireEvent.change(screen.getByTestId('age'), { target: { value: '7' } });
      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const { type, payload } = await getActionResult(store.dispatch);

    expect(type).toEqual(addContact.fulfilled.type);
    expect(payload).toEqual(newContact);
  });
});
