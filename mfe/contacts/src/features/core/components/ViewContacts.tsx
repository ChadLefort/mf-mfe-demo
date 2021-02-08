import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import {
  Avatar,
  Button,
  Container,
  createStyles,
  Grid,
  IconButton,
  LinearProgress,
  Link as MuiLink,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
  Typography
} from '@material-ui/core';
import { ContactType } from '@fake-company/types';
import { ErrorIcon } from '@fake-company/common-ui';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { removeContact } from '../contacts.slice';
import { useAppDispatch } from '../../../common/reducer';
import { useFetchContacts } from '../hooks/useFetchContacts';

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
            <TableCell />
            <TableCell>Name</TableCell>
            {type.length > 1 && <TableCell>Type</TableCell>}
            <TableCell>Rating</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, i) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Avatar src={`https://picsum.photos/200?random=${i + 1}`} />
              </TableCell>
              <TableCell>
                <MuiLink component={Link} color="textSecondary" to={`/${contact.id}`}>
                  {contact.name}
                </MuiLink>
              </TableCell>
              {type.length > 1 && <TableCell>{contact.type}</TableCell>}
              <TableCell>
                <Rating rating={contact.rating} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit" placement="top-start">
                  <IconButton component={Link} to={`edit/${contact.id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top-start">
                  <IconButton data-testid={`${contact.name}-delete`} onClick={remove(contact.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
