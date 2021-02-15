import { withTheme } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import React from 'react';

import { ContactForm } from './Form';

const story = {
  component: ContactForm,
  title: 'ContactForm',
  decorators: [withTheme]
};

export default story;

export const connect = () => (
  <ContactForm type={[ContactType.Customer]} onSubmit={(values) => Promise.resolve(console.log(values))} />
);

export const admin = () => (
  <ContactForm
    type={[ContactType.Customer, ContactType.Client]}
    onSubmit={(values) => Promise.resolve(console.log(values))}
  />
);
