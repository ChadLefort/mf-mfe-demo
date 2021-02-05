import { PetType } from '@fake-company/types';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { store } from './store';

const EditPet = React.lazy(() =>
  import('mfe_contacts/features/core/components/EditPet').then((module) => ({ default: module.EditPet }))
);

const AddPets = React.lazy(() =>
  import('mfe_contacts/features/core/components/AddPets').then((module) => ({ default: module.AddPets }))
);

const ViewPet = React.lazy(() =>
  import('mfe_contacts/features/core/components/ViewPet').then((module) => ({ default: module.ViewPet }))
);

const ViewPets = React.lazy(() =>
  import('mfe_contacts/features/core/components/ViewPets').then((module) => ({ default: module.ViewPets }))
);

const PetsProvider = React.lazy(() =>
  import('mfe_contacts/features/core/components/PetsProvider').then((module) => ({
    default: module.PetsProvider
  }))
);

export const Routes: React.FC = () => (
  <Suspense fallback={null}>
    <PetsProvider store={store}>
      <Switch>
        <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />
        <Route path="/add" render={() => <AddPets type={PetType.Cat} />} />
        <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />
        <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />
      </Switch>
    </PetsProvider>
  </Suspense>
);
