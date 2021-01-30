import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorIcon, Layout, Theme } from '@pet-tracker/common-ui';
import { Nav } from '@pet-tracker/nav';
import { orange } from '@material-ui/core/colors';

export const App: React.FC = () => (
  <Router>
    <Theme primaryColor={orange[400]}>
      <Layout nav={<Nav title="Cats" />}>
        <ErrorIcon />
      </Layout>
    </Theme>
  </Router>
);
