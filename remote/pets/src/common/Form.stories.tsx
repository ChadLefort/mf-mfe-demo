import React from 'react';
import { PetForm } from './Form';
import { withTheme } from '@pet-tracker/common-ui';

const story = {
  component: PetForm,
  title: 'PetForm',
  decorators: [withTheme]
};

export default story;

export const primary = () => <PetForm onSubmit={(values) => Promise.resolve(console.log(values))} />;
