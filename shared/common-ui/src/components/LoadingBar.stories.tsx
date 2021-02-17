import React from 'react';

import { withTheme } from '../utils/storybook-decorators';
import { LoadingBar } from './LoadingBar';

const story = {
  component: LoadingBar,
  title: 'LoadingBar',
  decorators: [withTheme]
};

export default story;

export const primary = () => <LoadingBar />;
