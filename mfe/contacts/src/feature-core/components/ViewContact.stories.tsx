import { withTheme } from '@fake-company/common-ui';
import { ContactType, contactsFixture } from '@fake-company/types';
import { withMock, withProvider, withRouter } from '@fake-company/utils';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Route } from 'react-router-dom';

import { RootState, contactsRootReducer } from '../../app/reducer';
import { ViewContact } from './ViewContact';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24').reply(
    200,
    contactsFixture.find(({ id }) => id === '89222b2d-8d06-41ff-82cf-c989dd90de24')
  );
};

const story = {
  component: ViewContact,
  title: 'ViewContact',
  decorators: [
    withTheme,
    withProvider<RootState>(contactsRootReducer),
    withRouter(['/89222b2d-8d06-41ff-82cf-c989dd90de24']),
    withMock(mock)
  ]
};

export default story;

export const connect = () => <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />;

export const admin = () => (
  <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer, ContactType.Client]} />} />
);
