import { PetType } from '@pet-tracker/types';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './common/reducer';
import { ViewPets } from './features/core/components/ViewPets';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ViewPets type={PetType.Cat} />
    </Router>
  </Provider>
);
