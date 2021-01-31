import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React from 'react';
import { Grid } from '@material-ui/core';

export const ErrorIcon: React.FC = () => (
  <Grid container justify="center">
    <ErrorOutlineIcon fontSize="large" titleAccess="Error" />
  </Grid>
);
