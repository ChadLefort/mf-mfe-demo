import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContactType } from '@fake-company/types';
import { Provider } from 'react-redux';
import { store } from './reducer';
import { ViewContacts } from '../feature-core/components/ViewContacts';
import { Theme } from '@fake-company/common-ui';
import { Box } from '@material-ui/core';

export const App: React.FC = () => (
  <Provider store={store}>
    <Theme>
      <Router>
        <Box p={3}>
          <ViewContacts type={[ContactType.Customer]} />
        </Box>
      </Router>
    </Theme>
  </Provider>
);
