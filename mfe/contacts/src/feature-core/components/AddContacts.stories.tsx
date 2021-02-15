import { withTheme } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import { withProvider } from '@fake-company/utils';
import React from 'react';

import { RootState, contactsRootReducer } from '../../app/reducer';
import { AddContacts } from './AddContacts';

const story = {
  component: AddContacts,
  title: 'AddContacts',
  decorators: [withTheme, withProvider<RootState>(contactsRootReducer)]
};

export default story;

export const connect = () => <AddContacts type={[ContactType.Customer]} />;
export const admin = () => <AddContacts type={[ContactType.Client, ContactType.Customer]} />;
