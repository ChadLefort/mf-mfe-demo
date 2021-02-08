import React from 'react';
import {
  Avatar,
  Container,
  createStyles,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme
} from '@material-ui/core';
import { contactsSelectors } from '../contacts.slice';
import { ContactType } from '@fake-company/types';
import { ErrorIcon } from '@fake-company/common-ui';
import { Rating } from '../../common-ui/Rating';
import { useFetchContacts } from '../hooks/useFetchContacts';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../app/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    item: {
      padding: theme.spacing(2)
    },
    avatar: {
      width: theme.spacing(40),
      height: theme.spacing(40)
    }
  })
);

type Props = {
  type: ContactType[];
};

export const ViewContact: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const { isFetching, error } = useFetchContacts(type);
  const { id } = useParams<{ id: string }>();
  const contact = useTypedSelector((state) => contactsSelectors.selectById(state, id));

  return contact && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item className={classes.item}>
          <Avatar src="https://picsum.photos/200" className={classes.avatar} />
        </Grid>
        <Grid item className={classes.item}>
          <List className={classes.list}>
            <ListItem>
              <ListItemText primary="Name" secondary={contact.name} />
            </ListItem>
            {type.length > 1 && (
              <ListItem>
                <ListItemText primary="Type" secondary={contact.type} />
              </ListItem>
            )}
            <ListItem>
              <Rating rating={contact.rating} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
