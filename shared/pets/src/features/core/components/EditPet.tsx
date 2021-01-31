import React, { Suspense } from 'react';
import {
  Container,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Theme,
  Typography
  } from '@material-ui/core';
import { IPet, PetType } from '../interface';
import { PetForm } from '../../../common/Form';
import { petsSelectors, updatePet } from '../pets.slice';
import { useAppDispatch, useTypedSelector } from '../../../common/reducer';
import { useFetchPets } from '../hooks/useFetchPets';
import { useHistory, useParams } from 'react-router-dom';

const ErrorIcon = React.lazy(() =>
  import('shared_common_ui/components/ErrorIcon').then((module) => ({ default: module.ErrorIcon }))
);

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

export const EditPet: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isFetching, error } = useFetchPets(type);
  const { id } = useParams<{ id: string }>();
  const pet = useTypedSelector((state) => petsSelectors.selectById(state, id));

  const onSubmit = (values: IPet) =>
    new Promise<void>((resolve, reject) => {
      try {
        dispatch(updatePet(values));
        history.push('/');
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  return pet && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Edit Pet
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <PetForm initialValues={pet} onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  ) : error ? (
    <Suspense fallback={null}>
      <ErrorIcon />
    </Suspense>
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
