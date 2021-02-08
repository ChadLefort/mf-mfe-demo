import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { contactsFixture, ContactType } from '@fake-company/types';
import { contactsRootReducer, RootState } from '../../app/reducer';
import { Route } from 'react-router-dom';
import { ViewContact } from './ViewContact';
import { withMock, withProvider, withRouter } from '@fake-company/utils';
import { withTheme } from '@fake-company/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/contacts').reply(200, contactsFixture);
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
