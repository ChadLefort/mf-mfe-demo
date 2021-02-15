import { render } from '@testing-library/react';
import React from 'react';

import { ErrorIcon } from './ErrorIcon';

describe('ErrorIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorIcon />);
    expect(baseElement).toBeTruthy();
  });
});
