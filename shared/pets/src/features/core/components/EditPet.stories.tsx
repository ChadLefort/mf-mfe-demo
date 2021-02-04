import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { EditPet } from './EditPet';
import { petsFixture, PetType } from '@pet-tracker/types';
import { petsRootReducer } from '../../../common/reducer';
import { RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { withMock, withProvider, withRouter } from '@pet-tracker/utils';
import { withTheme } from '@pet-tracker/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/pets').reply(200, petsFixture);
};

const story = {
  component: EditPet,
  title: 'EditPet',
  decorators: [
    withTheme,
    withProvider<RootState>(petsRootReducer),
    withRouter(['/edit/89222b2d-8d06-41ff-82cf-c989dd90de24']),
    withMock(mock)
  ]
};

export default story;

export const primary = () => <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />;
