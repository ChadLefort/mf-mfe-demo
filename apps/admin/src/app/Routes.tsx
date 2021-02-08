import React, { Suspense } from 'react';
import { ContactType } from '@fake-company/types';
import { Route, Switch } from 'react-router-dom';
import { store } from './store';

const EditContact = React.lazy(() =>
  import('mfe_contacts/feature-core/components/EditContact').then((module) => ({ default: module.EditContact }))
);

const AddContacts = React.lazy(() =>
  import('mfe_contacts/feature-core/components/AddContacts').then((module) => ({ default: module.AddContacts }))
);

const ViewContact = React.lazy(() =>
  import('mfe_contacts/feature-core/components/ViewContact').then((module) => ({ default: module.ViewContact }))
);

const ViewContacts = React.lazy(() =>
  import('mfe_contacts/feature-core/components/ViewContacts').then((module) => ({ default: module.ViewContacts }))
);

const ContactsProvider = React.lazy(() =>
  import('mfe_contacts/feature-core/components/ContactsProvider').then((module) => ({
    default: module.ContactsProvider
  }))
);

export const Routes: React.FC = () => (
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
