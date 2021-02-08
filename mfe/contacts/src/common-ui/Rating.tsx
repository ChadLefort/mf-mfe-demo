import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Box, createStyles, makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: yellow[600]
    }
  })
);

type Props = {
  rating: number;
};

export const Rating: React.FC<Props> = ({ rating }) => {
  const classes = useStyles();
  const filled = new Array(rating)
    .fill(null)
    .map((_, index) => <StarIcon key={index} className={classes.icon} data-testid="filled" />);
  const outlined = [];

  for (let index = filled.length; index < 5; index++) {
    outlined.push(<StarOutlineIcon key={index} className={classes.icon} data-testid="outlined" />);
  }

  return <Box>{filled.concat(outlined)}</Box>;
};
