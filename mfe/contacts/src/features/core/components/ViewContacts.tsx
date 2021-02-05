import {
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ErrorIcon } from '@fake-company/common-ui';
import { ContactType } from '@fake-company/types';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../common/reducer';
import { useFetchContacts } from '../hooks/useFetchContacts';
import { removeContact } from '../contacts.slice';

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
  type: ContactType[];
};

export const ViewContacts: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const remove = (id: string) => () => dispatch(removeContact(id));
  const { contacts, isFetching, error } = useFetchContacts(type);

  return contacts.length && !isFetching && !error ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell component="th" scope="row">
                <MuiLink component={Link} color="textSecondary" to={`/${contact.id}`}>
                  {contact.name}
                </MuiLink>
              </TableCell>
              <TableCell align="right">{contact.rating}</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to={`edit/${contact.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton data-testid={`${contact.name}-delete`} onClick={remove(contact.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : contacts.length === 0 && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Typography>No contacts found. Please add one.</Typography>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Button color="inherit" component={Link} to="/add">
            Add Contacts
          </Button>
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
