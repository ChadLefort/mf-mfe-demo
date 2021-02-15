import { withTheme } from '@fake-company/common-ui';
import { withRouter } from '@fake-company/utils';
import React from 'react';

import { Nav } from './Nav';

const story = {
  component: Nav,
  title: 'Nav',
  decorators: [withTheme, withRouter()]
};

export default story;

export const primary = () => <Nav title="Connect" />;
