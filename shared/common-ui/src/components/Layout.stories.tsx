import React from 'react';
import { Layout } from './Layout';
import { withTheme } from '../utils/storybook-decorators';

const story = {
  component: Layout,
  title: 'Layout',
  decorators: [withTheme]
};

export default story;

export const primary = () => <Layout />;
