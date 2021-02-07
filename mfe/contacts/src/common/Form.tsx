import { ContactType } from '@fake-company/types';
import { Button, Grid, Theme, createStyles, makeStyles, Slider, Typography, MenuItem } from '@material-ui/core';
import { TextField, makeValidate, Select } from 'mui-rff';
import React from 'react';
import { Field, Form } from 'react-final-form';
import * as Yup from 'yup';

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
  rating: Yup.number().required('Rating is a required field.')
});

type Props<T> = {
  initialValues?: T;
  type: ContactType[];
  onSubmit: (values: T) => Promise<void>;
};

export function ContactForm<T extends { name: string; rating: number }>({
  onSubmit,
  initialValues,
  type
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
            {type.length > 1 && (
              <Grid item xs={12}>
                <Select variant="outlined" name="type" label="Type" required inputProps={{ 'data-testid': 'type' }}>
                  <MenuItem value={ContactType.Client}>{ContactType.Client.toString()}</MenuItem>
                  <MenuItem value={ContactType.Customer}>{ContactType.Customer.toString()}</MenuItem>
                </Select>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography id="rating-slider" gutterBottom>
                Rating
              </Typography>
              <Field name="rating" type="number" defaultValue={5} parse={(value) => parseInt(value, 10)}>
                {(props) => (
                  <Slider
                    {...props.input}
                    aria-labelledby="rating-slider"
                    onChange={(_event, value) => props.input.onChange(value)}
                    valueLabelDisplay="auto"
                    marks
                    step={1}
                    min={1}
                    max={5}
                  />
                )}
              </Field>
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
