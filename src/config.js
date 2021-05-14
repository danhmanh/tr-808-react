import kickSfx from "./sounds/kick.wav";
import snareSfx from "./sounds/snare.wav";
import closedHihatSfx from "./sounds/closed_hihat.wav";

export const BLANK_PATTERN = {
  kick: Array(16).fill(0),
  snare: Array(16).fill(0),
  closedHihat: Array(16).fill(0),
};

export const VOLUMES = {
  kick: 0.5,
  snare: 0.5,
  closedHihat: 0.5,
};

export const SOUNDS = {
  kick: kickSfx,
  snare: snareSfx,
  closedHihat: closedHihatSfx,
};
