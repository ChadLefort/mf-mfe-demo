import { Nav } from 'features/core/components/Nav';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC = () => (
  <BrowserRouter>
    <Nav title="Cats" />
  </BrowserRouter>
);
