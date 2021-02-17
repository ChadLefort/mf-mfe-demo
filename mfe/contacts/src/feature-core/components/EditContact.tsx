import { ErrorIcon, LoadingBar } from '@fake-company/common-ui';
import { ContactType, IContact } from '@fake-company/types';
import { Grid, Paper, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ContactForm } from '../../common-ui/Form';
import { useFetchContactQuery, useUpdateContactMutation } from '../contacts.api';

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
  type: ContactType[];
};

export const EditContact: FC<Props> = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isFetching: isFetchingContact, isError: isErrorContactFetch, data: contact } = useFetchContactQuery(id);
  const [updateContact, { isLoading, isError: isErrorContactUpdate }] = useUpdateContactMutation();
  const isFetching = isFetchingContact || isLoading;
  const isError = isErrorContactFetch || isErrorContactUpdate;

  const onSubmit = (values: IContact) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await updateContact(values).unwrap();
        history.push('/');
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  return contact && !isFetching && !isError ? (
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Edit Contact
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm type={type} initialValues={contact} onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  ) : isError ? (
    <ErrorIcon />
  ) : (
    <LoadingBar />
  );
};
