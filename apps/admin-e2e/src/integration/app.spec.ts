import { getToolbarAppName } from '../support/app.po';

describe('admin', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.route2('GET', '/api/auth', { fixture: 'auth.json' });
    cy.route2('GET', '/api/contacts', { fixture: 'contacts.json' });
  });

  it('should contain app name in toolbar', () => {
    getToolbarAppName().contains('Admin');
  });
});
