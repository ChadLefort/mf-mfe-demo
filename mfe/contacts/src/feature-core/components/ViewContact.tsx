import { ErrorIcon } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import {
  Avatar,
  Container,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Rating } from '../../common-ui/Rating';
import { useFetchContactQuery } from '../contacts.api';

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

export const ViewContact: FC<Props> = ({ type }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { isFetching, isError, data: contact } = useFetchContactQuery(id);

  return contact && !isFetching && !isError ? (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item className={classes.item}>
          <Avatar src="https://picsum.photos/200?random=1" className={classes.avatar} />
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
  ) : isError ? (
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
