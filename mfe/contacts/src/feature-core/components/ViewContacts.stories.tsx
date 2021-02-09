import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { contactsFixture, ContactType } from '@fake-company/types';
import { contactsRootReducer, RootState } from '../../app/reducer';
import { Route } from 'react-router-dom';
import { ViewContacts } from './ViewContacts';
import { withMock, withProvider, withRouter } from '@fake-company/utils';
import { withTheme } from '@fake-company/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/contacts').reply(200, contactsFixture);
};

const story = {
  component: ViewContacts,
  title: 'ViewContacts',
  decorators: [withTheme, withProvider<RootState>(contactsRootReducer), withRouter(['/']), withMock(mock)]
};

export default story;

export const connect = () => <Route path="/" render={() => <ViewContacts type={[ContactType.Client]} />} />;

export const admin = () => (
  <Route path="/" render={() => <ViewContacts type={[ContactType.Client, ContactType.Customer]} />} />
);