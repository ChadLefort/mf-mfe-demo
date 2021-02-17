import { Grid, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React, { FC } from 'react';

type Props = {
  message?: string;
};

export const ErrorIcon: FC<Props> = ({ message }) => (
  <Grid container>
    <Grid container item xs={12} justify="center">
      <ErrorOutlineIcon fontSize="large" titleAccess="Error" />
    </Grid>
    <Grid container item xs={12} justify="center">
      {message && <Typography variant="body2">{message}</Typography>}
    </Grid>
  </Grid>
);
