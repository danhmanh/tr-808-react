import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btnPattern: {
    backgroundColor: "#34b1eb",
    marginLeft: 6,
    '&:hover': {
      backgroundColor: "#34b1eb",
   },
  },
  btnActive: {
    backgroundColor: "#eb346e",
    '&:hover': {
      backgroundColor: "#eb346e",
   },
  },
});

const BeatBar = (props) => {
  const classes = useStyles(props);
  const {currentBeat} = props
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={2}>
        </Grid>
        <Grid item md={10}>
          {Array(16).fill("").map((beat, index) => (
            <Button
              key={index}
              className={`${classes.btnPattern} ${index + 1 === currentBeat && classes.btnActive}`}
              disableRipple={true}
            >
            </Button>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BeatBar;
