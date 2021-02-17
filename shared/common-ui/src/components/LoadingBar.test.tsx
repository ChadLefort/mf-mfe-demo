import { render } from '@testing-library/react';
import React from 'react';

import { LoadingBar } from './LoadingBar';

describe('ErrorIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingBar />);
    expect(baseElement).toBeTruthy();
  });
});
