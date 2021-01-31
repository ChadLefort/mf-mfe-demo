import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
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
const Nav = React.lazy(() =>
  import('shared_nav/features/core/components/Nav').then((module) => ({ default: module.Nav }))
);

const Theme = React.lazy(() =>
  import('shared_common_ui/components/Theme').then((module) => ({ default: module.Theme }))
);

const Layout = React.lazy(() =>
  import('shared_common_ui/components/Layout').then((module) => ({ default: module.Layout }))
);

// const ErrorIcon = React.lazy(() =>
//   import('shared_common_ui/components/ErrorIcon').then((module) => ({ default: module.ErrorIcon }))
// );

export const App: React.FC = () => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <RemoteWrapper store={store}>
        <Router>
          <Theme primaryColor={orange[400]}>
            <Layout nav={<Nav title="Cats" />}>
              <Theme primaryColor={orange[500]}>
                <Switch>
                  <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />
                  <Route path="/add" render={() => <AddPets type={PetType.Cat} />} />
                  <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />
                  <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />
                </Switch>
              </Theme>
            </Layout>
          </Theme>
        </Router>
      </RemoteWrapper>
    </Suspense>
  </Provider>
);
