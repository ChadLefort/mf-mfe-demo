import { render, screen } from '@testing-library/react';
import React from 'react';

import { ErrorIcon } from './ErrorIcon';

describe('ErrorIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorIcon />);
    expect(baseElement).toBeTruthy();
  });

  it('should display a message', () => {
    render(<ErrorIcon message="Sorry there was an error" />);
    expect(screen.getByText('Sorry there was an error')).toBeTruthy();
  });
});
