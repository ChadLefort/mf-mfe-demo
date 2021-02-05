import React from 'react';
import { ContactForm } from './Form';
import { withTheme } from '@fake-company/common-ui';

const story = {
  component: ContactForm,
  title: 'ContactForm',
  decorators: [withTheme]
};

export default story;

export const primary = () => <ContactForm onSubmit={(values) => Promise.resolve(console.log(values))} />;
