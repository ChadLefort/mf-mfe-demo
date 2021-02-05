import React from 'react';
import { ContactForm } from './Form';
import { withTheme } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';

const story = {
  component: ContactForm,
  title: 'ContactForm',
  decorators: [withTheme]
};

export default story;

export const primary = () => (
  <ContactForm type={[ContactType.Customer]} onSubmit={(values) => Promise.resolve(console.log(values))} />
);
