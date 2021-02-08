import React from 'react';
import { AddContacts } from './AddContacts';
import { contactsRootReducer, RootState } from '../../app/reducer';
import { ContactType } from '@fake-company/types';
import { withProvider } from '@fake-company/utils';
import { withTheme } from '@fake-company/common-ui';

const story = {
  component: AddContacts,
  title: 'AddContacts',
  decorators: [withTheme, withProvider<RootState>(contactsRootReducer)]
};

export default story;

export const connect = () => <AddContacts type={[ContactType.Customer]} />;
export const admin = () => <AddContacts type={[ContactType.Client, ContactType.Customer]} />;
