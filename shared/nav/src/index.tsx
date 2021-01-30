import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from 'features/core/components/Nav';

ReactDOM.render(
  <BrowserRouter>
    <Nav title="Cats" />
  </BrowserRouter>,
  document.getElementById('root')
);
