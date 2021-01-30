import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorIcon } from 'components/ErrorIcon';
import { Layout } from 'components/Layout';
import { Theme } from 'components/Theme';

const App: React.FC = () => (
  <Theme>
    <Layout>
      <ErrorIcon />
    </Layout>
  </Theme>
);

ReactDOM.render(<App />, document.getElementById('root'));
