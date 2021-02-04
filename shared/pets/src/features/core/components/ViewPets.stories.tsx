import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture, PetType } from '@pet-tracker/types';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { ViewPets } from './ViewPets';
import { withMock, withProvider, withRouter } from '../../../utils/storybook-decorators';
import { withTheme } from '@pet-tracker/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/pets').reply(200, petsFixture);
};

const story = {
  component: ViewPets,
  title: 'ViewPets',
  decorators: [withTheme, withProvider<RootState>(petsRootReducer), withRouter(['/']), withMock(mock)]
};

export default story;

export const primary = () => <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />;
