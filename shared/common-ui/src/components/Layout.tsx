import { Box, Grid, Theme as MuiTheme, Toolbar, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: MuiTheme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

type Props = {
  nav?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ nav, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {nav}
      <Grid container className={classes.content}>
        <Toolbar />
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
