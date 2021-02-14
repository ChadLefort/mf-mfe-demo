import React from 'react';
import { Nav } from './Nav';
import { withRouter } from '@fake-company/utils';
import { withTheme } from '@fake-company/common-ui';

const story = {
  component: Nav,
  title: 'Nav',
  decorators: [withTheme, withRouter()]
};

export default story;

export const primary = () => <Nav title="Connect" />;
