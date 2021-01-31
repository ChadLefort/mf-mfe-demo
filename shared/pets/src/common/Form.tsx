import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { makeValidate, TextField } from 'mui-rff';

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

const schema = Yup.object().shape({
  name: Yup.string().required('Name is a required field.'),
  age: Yup.string().required('Age is a required field.')
});

type Props<T> = {
  initialValues?: T;
  onSubmit: (values: T) => Promise<void>;
};

export function PetForm<T extends { name: string; age: string }>({
  onSubmit,
  initialValues
}: React.PropsWithChildren<Props<T>>) {
  const classes = useStyles();

  return (
    <Form<T> onSubmit={onSubmit} validate={makeValidate(schema)} initialValues={initialValues}>
      {({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                type="text"
                required
                inputProps={{ 'data-testid': 'name' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Age"
                name="age"
                type="number"
                required
                inputProps={{ 'data-testid': 'age' }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Button
                classes={{ root: classes.button }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={invalid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
