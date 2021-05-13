import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import Instrument from "./Instrument";
import { BLANK_PATTERN, SOUNDS } from "../config";
import useSound from "use-sound";
import BeatBar from "./BeatBar";



const reducer = (beat, action) => {
  switch (action.type) {
    case "tick":
      return beat < 16 ? beat + 1 : 1;
    case "reset":
      return 1;
    default:
      return beat;
  }
};

const INSTRUMENT_NAMES = ["kick", "snare", "closedHihat"];

const MainBoard = () => {
  const [beat, dispatch] = useReducer(reducer, 1);
  const [isLooping, setIsLooping] = useState(false);
  const [bpm, setBpm] = useState(60);

  const [instrumentPatterns, setInstrumentPatterns] = useState(BLANK_PATTERN);
  const [playKick] = useSound(SOUNDS["kick"], { interrupt: true });
  const [playSnare] = useSound(SOUNDS["snare"], { interrupt: true });
  const [playClosedHihat] = useSound(SOUNDS["closedHihat"], { interrupt: true });

  const playSounds = (inst) => {
    if (inst === "kick") playKick();
    if (inst === "snare") playSnare();
    if (inst === "closedHihat") playClosedHihat();

  };

  useEffect(() => {
    if (!isLooping) return;
    let bpmTick = setInterval(() => {
      INSTRUMENT_NAMES.forEach((inst) => {
        if (instrumentPatterns[inst][beat - 1] === 1) {
          playSounds(inst);
        }
      });

      dispatch({ type: "tick" });
    }, (60 * 1000) / bpm / 4);

    return () => {
      clearInterval(bpmTick);
    };
  }, [isLooping, instrumentPatterns, bpm, beat]);

  const updatePattern = (name, index) => {
    let newPatterns = { ...instrumentPatterns };
    const properObject = [...newPatterns[name]];
    properObject[index] = newPatterns[name][index] === 0 ? 1 : 0;
    const currentPattern = { ...newPatterns, [name]: properObject };

    setInstrumentPatterns(currentPattern);
  };

  const togglePlay = () => {
    setIsLooping(!isLooping);
    dispatch({ type: "reset" })
  };

  const clearPatterns = () => {
    setInstrumentPatterns(BLANK_PATTERN);
  };

  return (
    <div>
      <Button onClick={togglePlay}>{isLooping ? 'Stop' : 'Play'}</Button>
      <Button onClick={clearPatterns}>Clear</Button>
      <TextField
        label="Standard"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
        variant="outlined"
      />
      <BeatBar currentBeat={beat} />
      {INSTRUMENT_NAMES.map((name, index) => (
        <Instrument
          key={index}
          name={name}
          instrumentPatterns={instrumentPatterns}
          updatePattern={updatePattern}
        />
      ))}
    </div>
  );
};

export default MainBoard;
