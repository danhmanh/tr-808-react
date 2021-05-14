import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSound from "use-sound";
import { SOUNDS } from "../config";
import CustomKnob from "./CustomKnob";

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
  const { name, instrumentPatterns, updatePattern, volume, updateVolume } =
    props;

  const [playOn] = useSound(SOUNDS[name], { interrupt: true });

  const toggleActive = (index) => {
    instrumentPatterns[name][index] === 0 && playOn();
    updatePattern(name, index);
  };

  const onChangeVolume = (event, value) => {
    updateVolume(name, value)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.btnName}
            onClick={playOn}
          >
            {name}
          </Button>

          <Slider
            value={volume}
            aria-labelledby="continuous-slider"
            name={name}
            onChange={onChangeVolume}
          />
        </Grid>
        <Grid item md={1}>
          {/* <CustomKnob /> */}
        </Grid>
        <Grid item md={9}>
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
