import React from 'react';
import { AddPets } from './AddPets';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { PetType } from '@pet-tracker/types';
import { withProvider } from '../../../utils/storybook-decorators';
import { withTheme } from '@pet-tracker/common-ui';

const story = {
  component: AddPets,
  title: 'AddPets',
  decorators: [withTheme, withProvider<RootState>(petsRootReducer)]
};

export default story;

export const primary = () => <AddPets type={PetType.Cat} />;
