import { render, screen } from '@testing-library/react';
import React from 'react';

import { LoadingBar } from './LoadingBar';

describe('LoadingBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingBar />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
