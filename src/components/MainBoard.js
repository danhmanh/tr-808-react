import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Instrument from "./Instrument";
import { BLANK_PATTERN } from "../config";
import kick808 from "../sounds/kick.wav";
import snare808 from "../sounds/snare.wav";
import useSound from "use-sound";

const SOUND_NAMES = {
  kick: kick808,
  snare: snare808,
};

const INSTRUMENT_NAMES = ["kick", "snare"];

const MainBoard = () => {
  const [isLooping, setIsLooping] = useState(true);
  const [bpm, setBpm] = useState(120);

  const [instrumentPatterns, setInstrumentPatterns] = useState(BLANK_PATTERN);
  const [playKick] = useSound(SOUND_NAMES['kick'], { interrupt: true });
  const [playSnare] = useSound(SOUND_NAMES['snare'], { interrupt: true });

  const playSounds = (inst) => {
    if(inst === 'kick') playKick()
    if(inst === 'snare') playSnare()
  }

    useEffect(() => {
    let beatIndex = 1;
    let bpmTick = setInterval(() => {
      if (!isLooping) return;

      INSTRUMENT_NAMES.forEach(inst => {
        if (instrumentPatterns[inst][beatIndex - 1] === 1) {
          playSounds(inst)
          console.log(`${beatIndex}: play`);
        } else {
          console.log(`${beatIndex}: -`);
        }
      })

      if (beatIndex < 16) {
        beatIndex += 1;
      } else {
        beatIndex = 1;
      }
    }, (60 * 1000) / bpm / 4);

    return () => {
      clearInterval(bpmTick);
    };
  }, [isLooping, instrumentPatterns]);

  const updatePattern = (name, index) => {
    let newPatterns = { ...instrumentPatterns };
    newPatterns[name][index] = newPatterns[name][index] === 0 ? 1 : 0;
    setInstrumentPatterns(newPatterns);
  };

  const togglePlay = () => {
    setIsLooping(!isLooping);
  };

  const clearPatterns = () => {

    //? Why can not use BLANK_PATTERN?
    setInstrumentPatterns({
      kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  };

  return (
    <div>
      <Button onClick={togglePlay}>Play!</Button>
      <Button onClick={clearPatterns}>Clear</Button>
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
