import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSound from "use-sound";
import { SOUNDS } from "../config";

const useStyles = makeStyles({
  btnPattern: {
    backgroundColor: "#34b1eb",
    marginLeft: 6,
    width: 50,
    height: 50,
    "&:hover": {
      backgroundColor: "#34b1eb",
    },
  },
  btnActive: {
    backgroundColor: "#eb346e",
    "&:hover": {
      backgroundColor: "#eb346e",
    },
  },
  btnName: {
    width: "100%",
  },
});

const Instrument = (props) => {
  const classes = useStyles(props);
  const { name, instrumentPatterns, updatePattern } = props;

  const [playOn] = useSound(SOUNDS[name], { interrupt: true });

  const toggleActive = (index) => {
    instrumentPatterns[name][index] === 0 && playOn();
    updatePattern(name, index);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.btnName}
          >
            {name}
          </Button>
        </Grid>
        <Grid item md={10}>
          {instrumentPatterns[name].map((beat, index) => (
            <Button
              key={index}
              className={`${classes.btnPattern} ${
                beat === 1 && classes.btnActive
              }`}
              onClick={() => toggleActive(index)}
              disableRipple={true}
              variant="contained"
              color="primary"
            >
              {index + 1}
            </Button>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Instrument;
