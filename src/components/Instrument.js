import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSound from "use-sound";
import kick808 from "../sounds/kick.wav";
import snare808 from "../sounds/snare.wav";

const SOUND_NAMES = {
  kick: kick808,
  snare: snare808,
};

const useStyles = makeStyles({
  btnPattern: {
    backgroundColor: "#34b1eb",
    marginLeft: 6,
    width: 50,
    height: 50,
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

const Instrument = (props) => {
  const classes = useStyles(props);
  const { name, isLooping, bpm, instrumentPatterns, updatePattern } = props;

  const [playOn] = useSound(SOUND_NAMES[name], { interrupt: true });

  // useEffect(() => {
  //   let beatIndex = 1;
  //   let bpmTick = setInterval(() => {
  //     if (!isLooping) return;
  //     if (pattern[beatIndex - 1] === 1) {
  //       playOn();
  //       console.log(`${beatIndex}: play`);
  //     } else {
  //       console.log(`${beatIndex}: -`);
  //     }

  //     if (beatIndex < 16) {
  //       beatIndex += 1;
  //     } else {
  //       beatIndex = 1;
  //     }
  //   }, (60 * 1000) / bpm);

  //   return () => {
  //     clearInterval(bpmTick);
  //   };
  // }, [isLooping, pattern]);

  const toggleActive = (index) => {
    updatePattern(name, index)
    instrumentPatterns[name][index] === 1 && playOn()
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <Paper>{name}</Paper>
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
