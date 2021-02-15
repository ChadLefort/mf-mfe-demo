import { withTheme } from '@fake-company/common-ui';
import { ContactType, contactsFixture } from '@fake-company/types';
import { withMock, withProvider, withRouter } from '@fake-company/utils';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { Route } from 'react-router-dom';

import { RootState, contactsRootReducer } from '../../app/reducer';
import { ViewContacts } from './ViewContacts';

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
