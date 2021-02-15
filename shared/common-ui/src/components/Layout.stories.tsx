import React from 'react';

import { withTheme } from '../utils/storybook-decorators';
import { Layout } from './Layout';

const story = {
  component: Layout,
  title: 'Layout',
  decorators: [withTheme]
};

export default story;

export const primary = () => <Layout />;
