import { withTheme } from '@fake-company/common-ui';
import { ContactType, contactsFixture } from '@fake-company/types';
import { withMock, withProvider, withRouter } from '@fake-company/utils';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Route } from 'react-router-dom';

import { contactsRootReducer } from '../../app/reducer';
import { RootState } from '../../app/reducer';
import { EditContact } from './EditContact';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(
    200,
    contactsFixture.find(({ id }) => id === '89222b2d-8d06-41ff-82cf-c989dd90de24')
  );
};

const story = {
  component: EditContact,
  title: 'EditContact',
  decorators: [
    withTheme,
    withProvider<RootState>(contactsRootReducer),
    withRouter(['/edit/89222b2d-8d06-41ff-82cf-c989dd90de24']),
    withMock(mock)
  ]
};

export default story;

export const connect = () => <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Customer]} />} />;

export const admin = () => (
  <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Client, ContactType.Customer]} />} />
);
