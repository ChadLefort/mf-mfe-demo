import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import React from 'react';

export const ErrorIcon: React.FC = () => (
  <Grid container justify="center">
    <ErrorOutlineIcon fontSize="large" titleAccess="Error" />
  </Grid>
);
