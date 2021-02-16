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
import CallIcon from '@material-ui/icons/Call';
import React, { FC, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

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
    link: {
      color: 'inherit',
      textDecoration: 'none'
    },
    icon: {
      paddingRight: theme.spacing(1)
    }
  })
);

type Props = {
  title: string;
};

export const Nav: FC<Props> = ({ title }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link to="/" className={classes.link}>
            <Box display="flex" alignItems="center">
              <Box className={classes.icon}>
                <CallIcon />
              </Box>
              <Typography variant="h6" component="h1" noWrap>
                {title}
              </Typography>
            </Box>
          </Link>
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
              <ListItemText primary="View Contacts" />
            </ListItem>
            <ListItem button component={NavLink} to="/add" exact activeClassName="Mui-selected">
              <ListItemText primary="Add Contacts" />
            </ListItem>
            {title === 'Admin' ? (
              <ListItem button component="a" href="/connect">
                <ListItemText primary="Connect" />
              </ListItem>
            ) : (
              <ListItem button component="a" href="/admin">
                <ListItemText primary="Admin" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};
