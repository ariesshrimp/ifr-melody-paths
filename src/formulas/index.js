import { isQuality } from "../qualities";

const ONE = 1;
const ONE_AND_A_HALF = 2;
const TWO = 3;
const TWO_AND_A_HALF = 4;
const THREE = 5;
const FOUR = 6;
const FOUR_AND_A_HALF = 7;
const FIVE = 8;
const FIVE_AND_A_HALF = 9;
const SIX = 10;
const SIX_AND_A_HALF = 11;
const SEVEN = 12;

export const nameNotesAsNaturals = (chord) => {
  console.log(isQuality(chord));
  return chord.map((note) => {
    switch (chord[0].value) {
      case ONE_AND_A_HALF:
      case ONE: {
        switch (note.value) {
          case ONE:
            return Note({
              ...note,
              relative: 1,
              name: "1"
            });
          case TWO:
            return Note({
              ...note,
              relative: 2,
              name: "2"
            });
          case THREE:
            return Note({
              ...note,
              relative: 3,
              name: "3"
            });
          case FOUR: {
            if (isQuality(chord) === "sus4") {
              return Note({
                ...note,
                relative: 4,
                name: "4"
              });
            } else
              return Note({
                ...note,
                relative: 3,
                name: "3",
                accidentals: ["#"]
              });
          }
          case FIVE:
            return Note({
              ...note,
              relative: 5,
              name: "5"
            });
          case SIX:
            return Note({
              ...note,
              relative: 6,
              name: "6"
            });
          case SEVEN:
            return Note({
              ...note,
              relative: 7,
              name: "7"
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "1",
              accidentals: ["#"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "3",
              accidentals: ["b"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "5",
              accidentals: ["b"]
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "5",
              accidentals: ["#"]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "7",
              accidentals: ["b"]
            });
          default:
            return note;
        }
      }
      case TWO_AND_A_HALF:
      case TWO: {
        switch (note.value) {
          case TWO:
            return Note({
              ...note,
              relative: 1,
              name: "2"
            });
          case FOUR:
            return Note({
              ...note,
              relative: 3,
              name: "4"
            });
          case FIVE:
            return Note({
              ...note,
              relative: 4,
              name: "5"
            });
          case SIX:
            return Note({
              ...note,
              relative: 5,
              name: "6"
            });
          case ONE:
            return Note({
              ...note,
              relative: 7,
              name: "1"
            });

          case SEVEN:
            return Note({
              ...note,
              relative: 7,
              name: "1",
              accidentals: ["b"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "1",
              accidentals: ["#"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "2",
              accidentals: ["#"]
            });
          case THREE:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus2" ? 2 : 3,
              name: isQuality(chord) === "sus2" ? "3" : "4",
              accidentals: isQuality(chord) === "sus2" ? [] : ["b"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "4",
              accidentals: ["#"]
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "6",
              accidentals: ["b"]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "6",
              accidentals: ["#"]
            });
          default:
            return note;
        }
      }

      case THREE: {
        switch (note.value) {
          case THREE:
            return Note({
              ...note,
              relative: 1,
              name: "3"
            });
          case FIVE:
            return Note({
              ...note,
              relative: 3,
              name: "5"
            });
          case SIX:
            return Note({
              ...note,
              relative: 4,
              name: "6"
            });
          case SEVEN:
            return Note({
              ...note,
              relative: 5,
              name: "7"
            });
          case TWO:
            return Note({
              ...note,
              relative: 7,
              name: "2"
            });

          case FOUR:
            return Note({
              ...note,
              relative: 1,
              name: "3",
              accidentals: ["#"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 2,
              name: "4",
              accidentals: ["#"]
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "5",
              accidentals: ["#"]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "7",
              accidentals: ["b"]
            });
          case ONE:
            return Note({
              ...note,
              relative: 5,
              name: "7",
              accidentals: ["#"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "2",
              accidentals: ["b"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "2",
              accidentals: ["#"]
            });
          default:
            return note;
        }
      }
      case FOUR_AND_A_HALF:
      case FOUR: {
        switch (note.value) {
          case FOUR:
            return Note({ ...note, relative: 1, name: "4" });
          case SIX:
            return Note({ ...note, relative: 3, name: "6" });
          case ONE:
            return Note({ ...note, relative: 5, name: "1" });
          case THREE:
            return Note({ ...note, relative: 7, name: "3" });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "4",
              accidentals: ["#"]
            });
          case FIVE:
            return Note({
              ...note,
              relative: 2,
              name: "5",
              accidentals: []
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "6",
              accidentals: ["b"]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus4" ? 4 : 3,
              name: isQuality(chord) === "sus4" ? "7" : "6",
              accidentals: isQuality(chord) === "sus4" ? ["b"] : ["#"]
            });
          case SEVEN:
            return Note({
              ...note,
              relative: 1,
              name: "1",
              accidentals: ["b"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "1",
              accidentals: ["#"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "3",
              accidentals: ["b"]
            });
          case TWO:
            return Note({
              ...note,
              relative: 7,
              name: "3",
              accidentals: ["b", "b"]
            });
          default:
            return note;
        }
      }

      case FIVE_AND_A_HALF:
      case FIVE: {
        switch (note.value) {
          case FIVE:
            return Note({ ...note, relative: 1, name: "5" });
          case SEVEN:
            return Note({ ...note, relative: 3, name: "7" });
          case TWO:
            return Note({ ...note, relative: 5, name: "2" });
          case FOUR:
            return Note({ ...note, relative: 7, name: "4" });

          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "5",
              accidentals: ["#"]
            });
          case SIX:
            return Note({
              ...note,
              relative: 2,
              name: "6",
              accidentals: [""]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "7",
              accidentals: ["b"]
            });
          case ONE:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus4" ? 4 : 3,
              name: isQuality(chord) === "sus4" ? "1" : "7",
              accidentals: isQuality(chord) === "sus4" ? [] : ["#"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "2",
              accidentals: ["b"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "2",
              accidentals: ["#"]
            });
          case THREE:
            return Note({
              ...note,
              relative: 7,
              name: "4",
              accidentals: ["b"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "4",
              accidentals: ["#"]
            });
          default:
            return note;
        }
      }

      case SIX_AND_A_HALF:
      case SIX: {
        switch (note.value) {
          case SIX:
            return Note({ ...note, relative: 1, name: "6" });
          case ONE:
            return Note({ ...note, relative: 3, name: "1" });
          case THREE:
            return Note({ ...note, relative: 5, name: "3" });
          case FIVE:
            return Note({ ...note, relative: 7, name: "5" });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 1,
              name: "6",
              accidentals: ["#"]
            });
          case -5:
            return Note({
              ...note,
              relative: 2,
              name: "7",
              accidentals: []
            });
          case SEVEN:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus2" ? 2 : 3,
              name: isQuality(chord) === "sus2" ? "7" : "1",
              accidentals: isQuality(chord) === "sus2" ? [] : ["b"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "1",
              accidentals: ["#"]
            });
          case TWO:
            return Note({
              ...note,
              relative: 4,
              name: "2",
              accidentals: []
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "3",
              accidentals: ["b"]
            });
          case FOUR:
            return Note({
              ...note,
              relative: 5,
              name: "3",
              accidentals: ["#"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "5",
              accidentals: ["b"]
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "5",
              accidentals: ["#"]
            });
          default:
            return note;
        }
      }

      case SEVEN: {
        switch (note.value) {
          case SEVEN:
            return Note({ ...note, relative: 1, name: "7" });
          case TWO:
            return Note({ ...note, relative: 3, name: "2" });
          case FOUR:
            return Note({ ...note, relative: 5, name: "4" });
          case SIX:
            return Note({ ...note, relative: 7, name: "6" });
          case ONE:
            return Note({
              ...note,
              relative: 1,
              name: "7",
              accidentals: ["#"]
            });
          case ONE_AND_A_HALF:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus2" ? 2 : 3,
              name: isQuality(chord) === "sus2" ? "1" : "2",
              accidentals: isQuality(chord) === "sus2" ? [] : ["b"]
            });
          case TWO_AND_A_HALF:
            return Note({
              ...note,
              relative: 3,
              name: "2",
              accidentals: ["#"]
            });
          case THREE:
            return Note({
              ...note,
              relative: isQuality(chord) === "sus4" ? 4 : 5,
              name: isQuality(chord) === "sus4" ? "3" : "4",
              accidentals: isQuality(chord) === "sus4" ? [] : ["b"]
            });
          case FOUR_AND_A_HALF:
            return Note({
              ...note,
              relative: 5,
              name: "4",
              accidentals: ["#"]
            });
          case FIVE:
            return Note({
              ...note,
              relative: 5,
              name: "4",
              accidentals: ["#", "#"]
            });
          case FIVE_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "6",
              accidentals: ["b"]
            });
          case SIX_AND_A_HALF:
            return Note({
              ...note,
              relative: 7,
              name: "6",
              accidentals: ["#"]
            });
          default:
            return note;
        }
      }
      default:
        return note;
    }
  });
};

export const Note = ({ accidentals = [], chordTone, value, name }) => ({
  accidentals,
  chordTone,
  value,
  name
});

export const Naturals = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN];
export const Outside = [
  ONE_AND_A_HALF,
  TWO_AND_A_HALF,
  FOUR_AND_A_HALF,
  FIVE_AND_A_HALF,
  SIX_AND_A_HALF
];

export const DiatonicChords = {
  One: [ONE, THREE, FIVE, SEVEN],
  Two: [TWO, SIX, FOUR, ONE],
  Three: [THREE, FIVE, SEVEN, TWO],
  Four: [FOUR, SIX, ONE, THREE],
  Five: [FIVE, SEVEN, TWO, FOUR],
  Six: [SIX, ONE, THREE, FIVE],
  Seven: [SEVEN, TWO, FOUR, SIX]
};

export const NonDiatonicChords = {
  SharpOne: [ONE_AND_A_HALF, FOUR, FIVE_AND_A_HALF, ONE],
  SharpTwo: [TWO_AND_A_HALF, FIVE, SIX_AND_A_HALF, TWO],
  // SharpThree: sharp three is actually just diatonic four
  SharpFour: [FOUR_AND_A_HALF, SIX_AND_A_HALF, ONE_AND_A_HALF, FOUR],
  SharpFive: [FIVE_AND_A_HALF, ONE, TWO_AND_A_HALF, FIVE],
  SharpSix: [SIX_AND_A_HALF, TWO, FOUR, SIX]
  // SharpSeven: sharp seven is actually just diatonic one
};

const NaturalName = (value) => {
  switch (value) {
    case ONE:
      return "1";
    case TWO:
      return "2";
    case THREE:
      return "3";
    case FOUR:
      return "4";
    case FIVE:
      return "5";
    case SIX:
      return "6";
    case SEVEN:
      return "7";
    default:
      return "";
  }
};

export const complete = (chord) =>
  Naturals.reduce((result, note) => {
    const naturalName = NaturalName(note);
    const chordTone = chord.find(({ name }) => {
      return name === naturalName;
    });
    if (chordTone) return [...result, chordTone];
    else
      return [
        ...result,
        Note({ chordTone: false, value: note, name: naturalName })
      ];
  }, []);
