import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { store } from './store';

const EditPet = React.lazy(() =>
  import('shared_pets/features/core/components/EditPet').then((module) => ({ default: module.EditPet }))
);

const AddPets = React.lazy(() =>
  import('shared_pets/features/core/components/AddPets').then((module) => ({ default: module.AddPets }))
);

const ViewPet = React.lazy(() =>
  import('shared_pets/features/core/components/ViewPet').then((module) => ({ default: module.ViewPet }))
);

const ViewPets = React.lazy(() =>
  import('shared_pets/features/core/components/ViewPets').then((module) => ({ default: module.ViewPets }))
);

const RemoteWrapper = React.lazy(() =>
  import('shared_pets/features/core/components/RemoteWrapper').then((module) => ({ default: module.RemoteWrapper }))
);

// // TODO: refactor to shared types
enum PetType {
  Cat = 'Cat',
  Dog = 'Dog'
}

export const Routes: React.FC = () => (
  <Suspense fallback={null}>
    <RemoteWrapper store={store}>
      <Switch>
        <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />
        <Route path="/add" render={() => <AddPets type={PetType.Cat} />} />
        <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />
        <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />
      </Switch>
    </RemoteWrapper>
  </Suspense>
);
