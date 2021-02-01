import { Box, Container, LinearProgress } from '@material-ui/core';
import { ErrorIcon } from '@pet-tracker/common-ui';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../common/reducer';
import { fetchAuthToken } from '../auth.slice';

export const Auth: React.FC = ({ children }) => {
  const { isFetching, ssoToken, error } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthToken());
  }, [dispatch]);

  return !isFetching && ssoToken ? (
    (children as JSX.Element)
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <Box margin={2}>
        <LinearProgress />
      </Box>
    </Container>
  );
};
