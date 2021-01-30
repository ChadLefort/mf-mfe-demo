import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PetsIcon from '@material-ui/icons/Pets';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
