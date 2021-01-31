import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PetType } from './features/core/interface';
import { Provider } from 'react-redux';
import { store } from './common/reducer';
import { ViewPets } from './features/core/components/ViewPets';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ViewPets type={PetType.Cat} />
    </Router>
  </Provider>
);
