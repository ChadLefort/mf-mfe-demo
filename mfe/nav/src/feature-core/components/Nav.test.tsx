import React from 'react';
import { Nav } from './Nav';
import { renderWithRouter } from '../../utils/test-utils';

describe('Nav', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(<Nav title="Test App" />, {});
    expect(baseElement).toBeTruthy();
  });
});
