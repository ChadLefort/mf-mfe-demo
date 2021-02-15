import { Theme } from '@fake-company/common-ui';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Nav } from '../feature-core/components/Nav';

export const App: React.FC = () => (
  <Theme>
    <Router>
      <Nav title="Connect" />
    </Router>
  </Theme>
);
