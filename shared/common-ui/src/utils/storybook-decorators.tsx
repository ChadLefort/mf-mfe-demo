import React from 'react';
import { Layout } from '../components/Layout';
import { orange } from '@material-ui/core/colors';
import { Theme } from '../components/Theme';

export const withTheme = (story: () => React.ReactNode) => <Theme primaryColor={orange[400]}>{story()}</Theme>;

export const withLayoutAndTheme = (story: () => React.ReactNode) => (
  <Theme primaryColor={orange[400]}>
    <Layout>{story()}</Layout>
  </Theme>
);
