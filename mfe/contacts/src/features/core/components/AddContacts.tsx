import { Grid, Paper, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { IContact, ContactType } from '@fake-company/types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { ContactForm } from '../../../common/Form';
import { useAppDispatch } from '../../../common/reducer';
import { addContact } from '../contacts.slice';

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
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = (values: IContact) =>
    new Promise<void>((resolve, reject) => {
      try {
        dispatch(addContact({ ...values, type: type.length === 1 ? type[0] : values.type }));
        history.push('/');
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  return (
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
  );
};
