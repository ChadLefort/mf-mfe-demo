import { Container, Grid, LinearProgress, Paper, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { ErrorIcon } from '@fake-company/common-ui';
import { IContact, ContactType } from '@fake-company/types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ContactForm } from '../../../common/Form';
import { useAppDispatch, useTypedSelector } from '../../../common/reducer';
import { useFetchContacts } from '../hooks/useFetchContacts';
import { contactsSelectors, updateContact } from '../contacts.slice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(2, 0)
    }
  })
);

type Props = {
  type: ContactType;
};

export const EditContact: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isFetching, error } = useFetchContacts(type);
  const { id } = useParams<{ id: string }>();
  const contact = useTypedSelector((state) => contactsSelectors.selectById(state, id));

  const onSubmit = (values: IContact) =>
    new Promise<void>((resolve, reject) => {
      try {
        dispatch(updateContact(values));
        history.push('/');
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  return contact && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Edit Contact
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm initialValues={contact} onSubmit={onSubmit} />
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
