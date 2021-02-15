import { render, screen } from '@testing-library/react';
import React from 'react';

import { Rating } from './Rating';

describe('Rating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rating rating={5} />);
    expect(baseElement).toBeTruthy();
  });

  it('should have 4 stars filled in', () => {
    render(<Rating rating={4} />);

    expect(screen.getAllByTestId('filled').length).toEqual(4);
    expect(screen.getAllByTestId('outlined').length).toEqual(1);
  });
});
