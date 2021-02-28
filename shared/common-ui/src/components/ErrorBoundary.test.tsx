import { render, screen } from '@testing-library/react';
import React from 'react';

import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const Child = () => {
    throw new Error('This is my custom error');
  };

  beforeEach(() => {
    console.error = jest.fn();
  });

  it('should render an error message', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByText('Sorry there was an error')).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });

  it('should render children', () => {
    render(
      <ErrorBoundary>
        <p>No errors here</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('No errors here')).toBeTruthy();
    expect(console.error).not.toHaveBeenCalled();
  });
});
