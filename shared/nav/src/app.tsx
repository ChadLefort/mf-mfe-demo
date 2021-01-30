import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from 'features/core/components/Nav';

const App: React.FC = () => (
  <BrowserRouter>
    <Nav title="Cats" />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
