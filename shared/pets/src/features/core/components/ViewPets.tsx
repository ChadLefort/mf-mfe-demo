import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { PetType } from '../interface';
import { removePet } from '../pets.slice';
import { useAppDispatch } from '../../../common/reducer';
import { useFetchPets } from '../hooks/useFetchPets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650
    },
    paper: {
      padding: theme.spacing(2)
    },
    item: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
);

type Props = {
  type: PetType;
};

export const ViewPets: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const remove = (id: string) => () => dispatch(removePet(id));
  const { pets, isFetching, error } = useFetchPets(type);

  return pets.length && !isFetching && !error ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell component="th" scope="row">
                <MuiLink component={Link} color="textSecondary" to={`/${pet.id}`}>
                  {pet.name}
                </MuiLink>
              </TableCell>
              <TableCell align="right">{pet.age}</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to={`edit/${pet.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton data-testid={`${pet.name}-delete`} onClick={remove(pet.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : pets.length === 0 && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Typography>No pets found. Please add one.</Typography>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Button color="inherit" component={Link} to="/add">
            Add Pets
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ) : error ? (
    <p>Error</p> // <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
