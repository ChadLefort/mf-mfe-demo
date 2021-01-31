import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import React from 'react';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: 'auto'
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    icon: {
      paddingRight: theme.spacing(1)
    }
  })
);

type Props = {
  title: string;
};

export const Nav: React.FC<Props> = ({ title }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Box display="flex" alignItems="center">
            <Box className={classes.icon}>
              <PetsIcon />
            </Box>
            <Typography variant="h6" component="h1" noWrap>
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <Box className={classes.drawerContainer}>
          <List>
            <ListItem button component={NavLink} to="/" exact activeClassName="Mui-selected">
              <ListItemText primary="View Pets" />
            </ListItem>
            <ListItem button component={NavLink} to="/add" exact activeClassName="Mui-selected">
              <ListItemText primary="Add Pets" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
