import React from 'react';

import { renderWithRouter } from '../../utils/test-utils';
import { Nav } from './Nav';

describe('Nav', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(<Nav title="Test App" />, {});
    expect(baseElement).toBeTruthy();
  });
});
