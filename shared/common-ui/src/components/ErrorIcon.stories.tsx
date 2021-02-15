import React from 'react';

import { withTheme } from '../utils/storybook-decorators';
import { ErrorIcon } from './ErrorIcon';

const story = {
  component: ErrorIcon,
  title: 'ErrorIcon',
  decorators: [withTheme]
};

export default story;

export const primary = () => <ErrorIcon />;
