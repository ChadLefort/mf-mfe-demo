import React from 'react';
import { ContactForm } from '../../common-ui/Form';
import { ContactType, IContact } from '@fake-company/types';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography, Container, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAddContactMutation } from '../contacts.api';
import { ErrorIcon } from '@fake-company/common-ui';

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

export const AddContacts: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const [addContact, { isLoading, isError }] = useAddContactMutation();

  const onSubmit = (values: IContact) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await addContact({ ...values, type: type.length === 1 ? type[0] : values.type }).unwrap();
        history.push('/');
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  return !isLoading ? (
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Add Contact
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm type={type} onSubmit={onSubmit} />
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
