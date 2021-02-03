import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { render } from '@testing-library/react';

describe('ErrorIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorIcon />);
    expect(baseElement).toBeTruthy();
  });
});
