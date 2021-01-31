import React, { Suspense } from 'react';
import {
  Container,
  createStyles,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme
  } from '@material-ui/core';
import { petsSelectors } from '../pets.slice';
import { PetType } from '../interface';
import { useFetchPets } from '../hooks/useFetchPets';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../common/reducer';

const ErrorIcon = React.lazy(() =>
  import('shared_common_ui/components/ErrorIcon').then((module) => ({ default: module.ErrorIcon }))
);

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
  type: PetType;
};

export const ViewPet: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const { isFetching, error } = useFetchPets(type);
  const { id } = useParams<{ id: string }>();
  const pet = useTypedSelector((state) => petsSelectors.selectById(state, id));

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
    <Suspense fallback={null}>
      <ErrorIcon />
    </Suspense>
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
