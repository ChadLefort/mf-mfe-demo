import React from 'react';

import { fireEvent, renderWithRouter, screen } from '../../utils/test-utils';
import { Nav } from './Nav';

describe('Nav', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(<Nav title="Test App" />, {});
    expect(baseElement).toBeTruthy();
  });

  it('should have a app title', () => {
    renderWithRouter(<Nav title="Test App" />, {});

    expect(screen.getByRole('heading')).toHaveTextContent('Test App');
  });

  it('should have some nav links', () => {
    renderWithRouter(<Nav title="Test App" />, {});

    expect(screen.getByRole('button', { name: 'View Contacts' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add Contacts' })).toBeTruthy();
  });

  it('should take you to different routes', () => {
    const { history } = renderWithRouter(<Nav title="Test App" />, {});

    fireEvent.click(screen.getByRole('button', { name: 'View Contacts' }));

    expect(history.location.pathname).toEqual('/');

    fireEvent.click(screen.getByRole('button', { name: 'Add Contacts' }));

    expect(history.location.pathname).toEqual('/add');
  });

  it('should show the connect link', () => {
    renderWithRouter(<Nav title="Admin" />, {});

    expect(screen.getByRole('link', { name: 'Connect' })).toBeTruthy();
  });

  it('should show the admin link', () => {
    renderWithRouter(<Nav title="Connect" />, {});

    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
  });
});
