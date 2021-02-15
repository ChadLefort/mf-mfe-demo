import { ContactType } from '@fake-company/types';
import React, { FC, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { store } from './store';

const EditContact = lazy(async () => {
  const { EditContact } = await import('mfe_contacts/feature-core/components/EditContact');
  return { default: EditContact };
});

const AddContacts = lazy(async () => {
  const { AddContacts } = await import('mfe_contacts/feature-core/components/AddContacts');
  return { default: AddContacts };
});

const ViewContact = lazy(async () => {
  const { ViewContact } = await import('mfe_contacts/feature-core/components/ViewContact');
  return { default: ViewContact };
});

const ViewContacts = lazy(async () => {
  const { ViewContacts } = await import('mfe_contacts/feature-core/components/ViewContacts');
  return { default: ViewContacts };
});

const ContactsProvider = lazy(async () => {
  const { ContactsProvider } = await import('mfe_contacts/feature-core/components/ContactsProvider');
  return { default: ContactsProvider };
});

export const Routes: FC = () => (
  <Suspense fallback={null}>
    <ContactsProvider store={store}>
      <Switch>
        <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Customer, ContactType.Client]} />} />
        <Route path="/add" render={() => <AddContacts type={[ContactType.Customer, ContactType.Client]} />} />
        <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer, ContactType.Client]} />} />
        <Route path="/" render={() => <ViewContacts type={[ContactType.Customer, ContactType.Client]} />} />
      </Switch>
    </ContactsProvider>
  </Suspense>
);
