import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture, PetType } from '@pet-tracker/types';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { ViewPet } from './ViewPet';
import { withMock, withProvider, withRouter } from '../../../utils/storybook-decorators';
import { withTheme } from '@pet-tracker/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/pets').reply(200, petsFixture);
};

const story = {
  component: ViewPet,
  title: 'ViewPet',
  decorators: [
    withTheme,
    withProvider<RootState>(petsRootReducer),
    withRouter(['/89222b2d-8d06-41ff-82cf-c989dd90de24']),
    withMock(mock)
  ]
};

export default story;

export const primary = () => <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />;
