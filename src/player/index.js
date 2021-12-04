import * as Constants from "../constants";
import * as R from "ramda";
import * as Tone from "tone";
import ChordQualities from "../qualities";
import React from "react";

const permutations = R.xprod(
  ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
  [4]
  // [0, 1, 2, 3, 4, 5, 6, 7]
);
const keys = R.map(([name, number]) => `${name}${number}`, permutations);
const files = R.map(R.flip(R.concat)(".mp3?raw=true"), keys);
const urls = R.zipObj(keys, files);

const convert_to_tones = (chord, key) => {
  return chord.map(({ value }) => Constants.TONES_BY_KEY[key][value - 1]);
};

export const useAmplitudeEnvelope = ({
  attack = 0.1,
  decay = 0.3,
  sustain = 1,
  release = 0.6
}) => {
  const envelopeRef = React.useRef(null);

  React.useEffect(() => {
    const envelope = new Tone.AmplitudeEnvelope({
      attack,
      decay,
      sustain,
      release
    }).toDestination();

    envelopeRef.current = envelope;
    // return envelope.dispose
  }, [attack, decay, sustain, release]);

  return envelopeRef;
};

export const useSounds = ({ instrument = "pad_2_warm" }) => {
  const samplerRef = React.useRef(null);
  const [loading, loaded] = React.useState(true);
  const [error, errored] = React.useState(null);

  console.info(`sampling new instrument: ${instrument}`);
  React.useEffect(() => {
    const sampler = new Tone.Sampler({
      urls,
      baseUrl: `https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/${instrument}-mp3/`,
      onload: () => loaded(false),
      onerror: errored
    }).toDestination();
    samplerRef.current = sampler;
    // return sampler.dispose
  }, [instrument]);
  return { sampler: samplerRef, loading, error };
};

export const useProgression = ({ chords = [], key = "C", player }) => {
  const progressionRef = React.useRef(null);
  const noteNames = chords.map(({ chord, quality }, index) => {
    const functions = ChordQualities[quality](Constants.ALL_CHORDS[chord]);
    return {
      note: convert_to_tones(functions, key),
      duration: "1m",
      time: `${index}:0:0`
    };
  });

  React.useEffect(() => {
    if (player && !player.loading) {
      const part = new Tone.Part((time, { note, duration }) => {
        player.triggerAttackRelease(note, duration, time);
      }, noteNames).start(0);

      progressionRef.current = part;
      // return part.dispose
    }
  }, [noteNames, player]);

  return progressionRef;
};

export const useTransport = ({ bpm }) => {
  const transport = React.useRef();

  React.useEffect(() => {
    transport.current = Tone.Transport;
    transport.current.bpm.value = bpm;
  }, [bpm]);

  return transport;
};
