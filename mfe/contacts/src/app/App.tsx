import { Theme } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ViewContacts } from '../feature-core/components/ViewContacts';
import { store } from './reducer';

export const App: FC = () => (
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
