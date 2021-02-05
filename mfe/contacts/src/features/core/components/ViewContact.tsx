import {
  Container,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import { ErrorIcon } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../common/reducer';
import { useFetchContacts } from '../hooks/useFetchContacts';
import { contactsSelectors } from '../contacts.slice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
);

type Props = {
  type: ContactType;
};

export const ViewContact: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const { isFetching, error } = useFetchContacts(type);
  const { id } = useParams<{ id: string }>();
  const pet = useTypedSelector((state) => contactsSelectors.selectById(state, id));

  return pet && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <List className={classes.list}>
        <ListItem>
          <ListItemText primary="Name" secondary={pet.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Age" secondary={pet.age} />
        </ListItem>
      </List>
    </Paper>
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
