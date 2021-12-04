import * as R from 'ramda'
import {
  DiatonicChords,
  NonDiatonicChords,
} from "../formulas";

export const KEYS = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'B', 'Bb'
]

export const function_to_tone_for_key = key => {
  const root_note_position = R.findIndex(R.equals(key), KEYS)
  const [back, front] = R.splitAt(root_note_position, KEYS)
  const ordered_for_key = R.concat(front, back)
  return ordered_for_key
}

export const set_octave = octave => R.replace(/\d/g, octave)

export const set_octave_for_all = octave => tone_row => {
  return R.map(set_octave(octave), tone_row)
}

export const TONES_BY_KEY = R.zipObj(KEYS, R.map(R.compose(R.map(R.flip(R.concat)('4')), function_to_tone_for_key), KEYS))

export const ALL_CHORDS = R.merge(DiatonicChords, NonDiatonicChords);

export const ORDERED_CHORD_FUNCTION_NAMES = [
  "One",
  "SharpOne",
  "Two",
  "SharpTwo",
  "Three",
  "Four",
  "SharpFour",
  "Five",
  "SharpFive",
  "Six",
  "SharpSix",
  "Seven"
];

// export const notesByKey = {
//   C: [
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4"
//   ],
//   Db: [
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4"
//   ],
//   D: [
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4"
//   ],
//   Eb: [
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4"
//   ],
//   E: [
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4"
//   ],
//   F: [
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4"
//   ],
//   Gb: [
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4"
//   ],
//   G: [
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4"
//   ],
//   Ab: [
//     "Ab4",
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4"
//   ],
//   A: [
//     "A4",
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4"
//   ],
//   Bb: [
//     "Bb4",
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4"
//   ],
//   B: [
//     "B4",
//     "C4",
//     "Db4",
//     "D4",
//     "Eb4",
//     "E4",
//     "F4",
//     "Gb4",
//     "G4",
//     "Ab4",
//     "A4",
//     "Bb4"
//   ]
// };