import React from 'react';
import { addPet } from '../pets.slice';
import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography
  } from '@material-ui/core';
import { IPet, PetType } from '../interface';
import { PetForm } from '../../../common/Form';
import { useAppDispatch } from '../../../common/reducer';
import { useHistory } from 'react-router-dom';

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
  type: PetType;
};

export const AddPets: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = (values: IPet) =>
    new Promise<void>((resolve, reject) => {
      try {
        dispatch(addPet({ ...values, type }));
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
            Add Pet
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <PetForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  );
};
