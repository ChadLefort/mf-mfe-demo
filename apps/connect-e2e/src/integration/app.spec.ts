import { getToolbarAppName } from '../support/app.po';

describe('connect', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.route2('GET', '/api/auth', { fixture: 'auth.json' });
    cy.route2('GET', '/api/contacts?type=Cat', { fixture: 'contacts.json' });
  });

  it('should contain app name in toolbar', () => {
    getToolbarAppName().contains('Connect');
  });
});
