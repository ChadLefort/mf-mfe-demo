import { ContactType } from '@fake-company/types';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './common/reducer';
import { ViewContacts } from './features/core/components/ViewContacts';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ViewContacts type={ContactType.Customer} />
    </Router>
  </Provider>
);
