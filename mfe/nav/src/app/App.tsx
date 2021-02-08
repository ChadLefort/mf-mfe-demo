import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from '../feature-core/components/Nav';

export const App: React.FC = () => (
  <BrowserRouter>
    <Nav title="Connect" />
  </BrowserRouter>
);
