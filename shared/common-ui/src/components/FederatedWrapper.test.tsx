import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React, { lazy } from 'react';

import { withFederatedModule } from './FederatedWrapper';

describe('FederatedWrapper', () => {
  it('should show a loading bar then the dynamic import', async () => {
    const Layout = withFederatedModule(
      lazy(async () => {
        const { Layout } = await import('./Layout');
        return { default: Layout };
      })
    );

    render(
      <Layout>
        <p>Dynamic import loaded</p>
      </Layout>
    );

    expect(screen.getByRole('progressbar')).toBeDefined();
    expect(screen.queryByText('Dynamic import loaded')).toBeFalsy();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText('Dynamic import loaded')).toBeTruthy();
  });

  it('should show a loading bar then an error icon', async () => {
    console.error = jest.fn();

    const ThisIsABrokenImport = withFederatedModule(
      lazy(async () => {
        // @ts-ignore
        const { ThisIsABrokenImport } = await import('./ThisIsABrokenImport');
        return { default: ThisIsABrokenImport };
      })
    );

    render(<ThisIsABrokenImport />);

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });
});
