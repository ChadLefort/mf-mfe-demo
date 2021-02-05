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
import { ErrorIcon } from '@pet-tracker/common-ui';
import { PetType } from '@pet-tracker/types';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../common/reducer';
import { useFetchPets } from '../hooks/useFetchPets';
import { petsSelectors } from '../pets.slice';

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
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
