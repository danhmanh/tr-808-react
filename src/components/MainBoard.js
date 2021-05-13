import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import Instrument from "./Instrument";

const INSTRUMENT_NAMES = ["kick", "snare"];

const BLANK_PATTERN = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MainBoard = () => {
  const [isLooping, setIsLooping] = useState(true);
  const [bpm, setBpm] = useState(120);
  const [instrumentPatterns, setInstrumentPatterns] = useState(BLANK_PATTERN)


  const updatePattern = (name, index) => {
    let newPatterns = { ...instrumentPatterns };
    newPatterns[name][index] = newPatterns[name][index] === 0 ? 1 : 0;
    setInstrumentPatterns(newPatterns)
    console.log("🚀 ~ file: MainBoard.js ~ line 21 ~ updatePattern ~ instrumentPatterns", instrumentPatterns)
  };

  const togglePlay = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div>
      <Button onClick={togglePlay}>Play!</Button>
      {INSTRUMENT_NAMES.map((name, index) => (
        <Instrument
          key={index}
          name={name}
          isLooping={isLooping}
          bpm={bpm}
          instrumentPatterns={instrumentPatterns}
          updatePattern={updatePattern}
        />
      ))}
    </div>
  );
};

export default MainBoard;
