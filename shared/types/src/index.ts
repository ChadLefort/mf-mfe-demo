import { IContact } from './interfaces/contact';
import { IMicrofrontend } from './interfaces/mfe';

export * from './interfaces/contact';
export * from './interfaces/mfe';
export * from './types/store';

export const authFixture = require('./fixtures/auth.json') as {
  ssoToken: string;
};

export const contactsFixture = require('./fixtures/contacts.json') as IContact[];
export const mfeFixture = require('./fixtures/mfe-dev.json') as IMicrofrontend[];
