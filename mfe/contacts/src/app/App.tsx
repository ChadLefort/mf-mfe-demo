import { Theme } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AddContacts } from '../feature-core/components/AddContacts';
import { EditContact } from '../feature-core/components/EditContact';
import { ViewContact } from '../feature-core/components/ViewContact';
import { ViewContacts } from '../feature-core/components/ViewContacts';
import { store } from './reducer';

export const App: FC = () => (
  <Provider store={store}>
    <Theme>
      <Router>
        <Box p={3}>
          <Switch>
            <Route path="/edit/:id" render={() => <EditContact type={[ContactType.Customer]} />} />
            <Route path="/add" render={() => <AddContacts type={[ContactType.Customer]} />} />
            <Route path="/:id" render={() => <ViewContact type={[ContactType.Customer]} />} />
            <Route path="/" render={() => <ViewContacts type={[ContactType.Customer]} />} />
          </Switch>
        </Box>
      </Router>
    </Theme>
  </Provider>
);
