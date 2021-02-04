import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { withTheme } from '../utils/storybook-decorators';

const story = {
  component: ErrorIcon,
  title: 'ErrorIcon',
  decorators: [withTheme]
};

export default story;

export const primary = () => <ErrorIcon />;
