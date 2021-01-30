import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme as MuiTheme } from '@material-ui/core/styles';

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
