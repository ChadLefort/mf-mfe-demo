import { IContact, authFixture, contactsFixture, mfeFixture } from '@fake-company/types';

describe('queries', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/mfe', mfeFixture);
    cy.intercept('GET', '/api/auth', authFixture);
    cy.intercept('GET', '/api/contacts/*', (req) =>
      req.reply(contactsFixture.find(({ id }) => id === req.url.split('/').pop()) as IContact)
    );
    cy.intercept('GET', '/api/contacts', contactsFixture);

    cy.visit('/');
  });

  it('should contain app name in toolbar', () => {
    cy.findByRole('heading').should('contain', 'Admin');
  });

  it('should have some nav links', () => {
    cy.findAllByRole('button', { name: 'View Contacts' }).should('exist');
    cy.findAllByRole('button', { name: 'Add Contacts' }).should('exist');
  });

  it('should have have a table with contacts', () => {
    cy.findByRole('table', { name: 'simple table' }).should('exist');
    cy.findAllByRole('row').should('have.length', 6);
    cy.findAllByRole('row').first().should('contain', 'Type');
  });

  it('should allow you to view a single contact', () => {
    cy.findAllByRole('row').last().findByRole('link').click();
    cy.url().should('equal', 'http://localhost:1336/admin/fd546b4e-747d-448f-abaf-b0d119bae119');
    cy.findByText('Chloe Martinez').should('exist');
    cy.findByText('Customer').should('exist');
  });
});
