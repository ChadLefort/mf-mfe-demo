import { Theme } from '@fake-company/common-ui';
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Nav } from '../feature-core/components/Nav';

export const App: FC = () => (
  <Theme>
    <Router>
      <Nav title="Connect" />
    </Router>
  </Theme>
);
