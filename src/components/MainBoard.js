import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import Instrument from "./Instrument";

const INSTRUMENT_NAMES = ["kick", "snare"];
const MainBoard = () => {
  const [isLooping, setIsLooping] = useState(true);
  const [bpm, setBpm] = useState(120);

  // looping();
  const togglePlay = () => {
    setIsLooping(!isLooping)
  }
  return (
    <div>
      <Button onClick={togglePlay}>Play!</Button>
      {INSTRUMENT_NAMES.map((name, index) => (
        <Instrument key={index} name={name} isLooping={isLooping} bpm={bpm} />
      ))}
    </div>
  );
};

export default MainBoard;
