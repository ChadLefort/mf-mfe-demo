import { withFederatedModule } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import React, { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const EditContact = withFederatedModule(
  lazy(async () => {
    const { EditContact } = await import('mfe_contacts/feature-core/components/EditContact');
    return { default: EditContact };
  })
);

const AddContacts = withFederatedModule(
  lazy(async () => {
    const { AddContacts } = await import('mfe_contacts/feature-core/components/AddContacts');
    return { default: AddContacts };
  })
);

const ViewContact = withFederatedModule(
  lazy(async () => {
    const { ViewContact } = await import('mfe_contacts/feature-core/components/ViewContact');
    return { default: ViewContact };
  })
);

const ViewContacts = withFederatedModule(
  lazy(async () => {
    const { ViewContacts } = await import('mfe_contacts/feature-core/components/ViewContacts');
    return { default: ViewContacts };
  })
);

export const Routes: FC = () => (
  <Switch>
    <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Customer]} />} />
    <Route path="/add" render={() => <AddContacts type={[ContactType.Customer]} />} />
    <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />
    <Route path="/" render={() => <ViewContacts type={[ContactType.Customer]} />} />
  </Switch>
);
