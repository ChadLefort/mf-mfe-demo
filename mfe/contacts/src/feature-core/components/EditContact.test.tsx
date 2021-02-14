import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { actWithReturn, getQueryActionResult, renderWithProviders } from '../../utils/test-utils';
import { EditContact } from './EditContact';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { IContact, ContactType } from '@fake-company/types';
import { Route } from 'react-router-dom';

const axiosMock = new MockAdapter(axios);

describe('edit contact', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch contacts/updateContact action when form is submitted', async () => {
    const contact: IContact = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Chad',
      rating: 5,
      type: ContactType.Customer
    };

    axiosMock.onGet('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(200, { ...contact, rating: 4 });
    axiosMock.onPut('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(200, contact);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(
        <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Customer]} />} />,
        {
          initialEntries: ['/edit/89222b2d-8d06-41ff-82cf-c989dd90de24']
        }
      );

      await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

      fireEvent.change(screen.getByTestId('name'), { target: { value: 'Chad' } });
      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const data = await getQueryActionResult<IContact>(store.dispatch, 1);

    expect(data).toEqual(contact);
  });
});
