import React from 'react';

import { withTheme } from '../utils/storybook-decorators';
import { ErrorIcon } from './ErrorIcon';

const story = {
  component: ErrorIcon,
  title: 'ErrorIcon',
  decorators: [withTheme]
};

export default story;

export const noMessage = () => <ErrorIcon />;
export const withMessage = () => <ErrorIcon message="Sorry there was an error" />;
