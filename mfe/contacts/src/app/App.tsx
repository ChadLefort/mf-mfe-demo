import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContactType } from '@fake-company/types';
import { Provider } from 'react-redux';
import { store } from './reducer';
import { ViewContacts } from '../feature-core/components/ViewContacts';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ViewContacts type={[ContactType.Customer]} />
    </Router>
  </Provider>
);
