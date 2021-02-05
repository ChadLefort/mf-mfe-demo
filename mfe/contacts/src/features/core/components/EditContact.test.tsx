import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { actWithReturn, getActionResult, renderWithProviders } from '../../../utils/test-utils';
import { DeepPartial } from '@reduxjs/toolkit';
import { EditContact } from './EditContact';
import { fireEvent, screen } from '@testing-library/react';
import { IContact, contactsFixture, ContactType } from '@fake-company/types';
import { RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { updateContact } from '../contacts.slice';

const axiosMock = new MockAdapter(axios);
const initialState: DeepPartial<RootState> = {
  contacts: {
    core: {
      ids: ['89222b2d-8d06-41ff-82cf-c989dd90de24'],
      entities: {
        '89222b2d-8d06-41ff-82cf-c989dd90de24': {
          id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
          name: 'Pat',
          rating: '7',
          type: ContactType.Customer
        }
      },
      isFetching: false,
      error: null
    }
  }
};

describe('edit contact', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch contacts/updateContact action when form is submitted', async () => {
    const updatedContact: IContact = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Pat',
      rating: '8',
      type: ContactType.Customer
    };

    axiosMock.onGet('/api/contacts').reply(200, contactsFixture);
    axiosMock.onPut('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(200, updatedContact);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(
        <Route path="/edit/:id" render={() => <EditContact type={ContactType.Customer} />} />,
        {
          initialState,
          initialEntries: ['/edit/89222b2d-8d06-41ff-82cf-c989dd90de24']
        }
      );

      fireEvent.change(screen.getByTestId('rating'), { target: { value: '8' } });
      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const { type, payload } = await getActionResult<IContact>(store.dispatch, 1);

    expect(type).toEqual(updateContact.fulfilled.type);
    expect(payload).toEqual(updatedContact);
  });
});
