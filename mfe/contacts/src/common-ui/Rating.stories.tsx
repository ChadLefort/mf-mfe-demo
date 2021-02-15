import { withTheme } from '@fake-company/common-ui';
import React from 'react';

import { Rating } from './Rating';

const story = {
  component: Rating,
  title: 'Rating',
  decorators: [withTheme]
};

export default story;

export const primary = () => <Rating rating={3} />;
