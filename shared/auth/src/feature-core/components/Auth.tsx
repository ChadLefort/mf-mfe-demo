import { ErrorIcon, LoadingBar } from '@fake-company/common-ui';
import { Box } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../app/reducer';
import { fetchAuthToken } from '../auth.slice';

export const Auth: FC = ({ children }) => {
  const { isFetching, ssoToken, error } = useTypedSelector((state) => state.auth.core);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthToken());
  }, [dispatch]);

  return !isFetching && ssoToken ? (
    (children as JSX.Element)
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Box margin={2}>
      <LoadingBar />
    </Box>
  );
};
