import { Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React, { FC } from 'react';

export const ErrorIcon: FC = () => (
  <Grid container justify="center">
    <ErrorOutlineIcon fontSize="large" titleAccess="Error" />
  </Grid>
);
