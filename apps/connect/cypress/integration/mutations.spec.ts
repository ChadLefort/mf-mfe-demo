import { ContactType, IContact, authFixture, contactsFixture, mfeFixture } from '@fake-company/types';

describe('mutations', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/mfe', mfeFixture);
    cy.intercept('GET', '/api/auth', authFixture);
    cy.intercept('GET', '/api/contacts/*', (req) =>
      req.reply(contactsFixture.find(({ id }) => id === req.url.split('/').pop()) as IContact)
    );

    cy.visit('/');
  });

  it('should add a contact', () => {
    cy.intercept('GET', '/api/contacts', contactsFixture);
    cy.intercept('POST', '/api/contacts', {
      id: '9478e897-5731-4fa2-a2dc-7c1adccc53a2',
      name: 'Foo Bar Baz',
      rating: 5,
      type: ContactType.Customer
    });

    cy.findAllByRole('button', { name: 'Add Contacts' }).first().click();

    cy.url().should('equal', 'http://localhost:1337/connect/add');

    cy.findByRole('button', { name: 'Submit' }).should('be.disabled');
    cy.findByRole('textbox').type('Foo Bar');
    cy.findByRole('textbox').clear();
    cy.findByText('Name is a required field.').should('exist');
    cy.findByRole('textbox').type('Foo Bar Baz');
    cy.findByRole('button', { name: 'Submit' }).click();

    cy.url().should('equal', 'http://localhost:1337/connect/');
  });

  it('should edit a contact', () => {
    cy.intercept('GET', '/api/contacts', contactsFixture);
    cy.intercept('PUT', '/api/contacts', { ...contactsFixture[0], name: 'Foo Bar' });

    cy.findAllByRole('button', { name: 'Edit' }).first().click();

    cy.url().should('equal', 'http://localhost:1337/connect/edit/89222b2d-8d06-41ff-82cf-c989dd90de24');

    cy.findByRole('textbox').clear();
    cy.findByText('Name is a required field.').should('exist');
    cy.findByRole('button', { name: 'Submit' }).should('be.disabled');
    cy.findByRole('textbox').type('Foo Bar');
    cy.findByRole('button', { name: 'Submit' }).click();

    cy.url().should('equal', 'http://localhost:1337/connect/');
  });

  it('should delete a contact', () => {
    let interceptCount = 0;

    cy.intercept('DELETE', '/api/contacts/89222b2d-8d06-41ff-82cf-c989dd90de24', { statusCode: 200 });
    cy.intercept('/api/contacts', (req) => {
      if (interceptCount === 0) {
        interceptCount += 1;
        req.reply(contactsFixture);
      } else {
        req.reply(contactsFixture.filter(({ id }) => id !== '89222b2d-8d06-41ff-82cf-c989dd90de24'));
      }
    });

    cy.findAllByRole('button', { name: 'Delete' }).first().click();
    cy.wait(2000);
    cy.findByRole('row', { name: 'Chad Williams' }).should('not.exist');
  });
});
