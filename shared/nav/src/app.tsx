import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Nav } from './features/core/components/Nav';

export const App: React.FC = () => (
  <BrowserRouter>
    <Nav title="Cats" />
  </BrowserRouter>
);
