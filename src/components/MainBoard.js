import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import useSound from "use-sound";
import Instrument from "./Instrument";
import { BLANK_PATTERN, SOUNDS, VOLUMES } from "../config";
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
  const [bpm, setBpm] = useState(120);

  const [instrumentPatterns, setInstrumentPatterns] = useState(BLANK_PATTERN);
  const [volumes, setVolumes] = useState(VOLUMES);
  const [playKick] = useSound(SOUNDS.kick, { volume: volumes.kick / 100 });
  const [playSnare] = useSound(SOUNDS.snare, { volume: volumes.snare / 100});
  const [playClosedHihat] = useSound(SOUNDS.closedHihat, {
    volume: volumes.closedHihat / 100,
  });

  const playSounds = (inst) => {
    if (inst === "kick") playKick();
    if (inst === "snare") playSnare();
    if (inst === "closedHihat") playClosedHihat();
  };

  useEffect(() => {
    if (!isLooping) return;
    const bpmTick = setInterval(() => {
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
    const newPatterns = { ...instrumentPatterns };
    const properObject = [...newPatterns[name]];
    properObject[index] = newPatterns[name][index] === 0 ? 1 : 0;
    const currentPattern = { ...newPatterns, [name]: properObject };

    setInstrumentPatterns(currentPattern);
  };

  const updateVolume = (name, value) => {
    const updatedVolumes = {...volumes}
    updatedVolumes[name] = value

    setVolumes(updatedVolumes)
  }

  const togglePlay = () => {
    setIsLooping(!isLooping);
    dispatch({ type: "reset" });
  };

  const clearPatterns = () => {
    setInstrumentPatterns(BLANK_PATTERN);
  };

  const onChangeBpm = event => {
    const value = event.target.value
    setBpm(value < 300 ? value : 300)
  }

  return (
    <div>
      <Button onClick={togglePlay}>{isLooping ? "Stop" : "Play"}</Button>
      <Button onClick={clearPatterns}>Clear</Button>
      <TextField
        label="Standard"
        value={bpm}
        onChange={onChangeBpm}
        variant="outlined"
      />
      <BeatBar currentBeat={beat} />
      {INSTRUMENT_NAMES.map((name, index) => (
        <Instrument
          key={index}
          name={name}
          instrumentPatterns={instrumentPatterns}
          volume={volumes[name]}
          updatePattern={updatePattern}
          updateVolume={updateVolume}
        />
      ))}
    </div>
  );
};

export default MainBoard;
