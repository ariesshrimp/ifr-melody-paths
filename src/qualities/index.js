import { Note } from "../formulas";
import * as R from "ramda";
const MaxOfTwelve = (sum) => {
  if (sum > 12) return sum - 12;
  else return sum;
};

const annotate = (value) => {
  return Note({
    value,
    chordTone: true,
    accidentals: []
  });
};

export const isQuality = ([root, A, B, C = {}]) => {
  const intervals = R.equals([
    R.subtract(A.value, root.value),
    R.subtract(B.value, root.value),
    R.subtract(C.value, root.value)
  ]);
  console.log(
    R.subtract(A.value, root.value),
    R.subtract(B.value, root.value),
    R.subtract(C.value, root.value)
  );
  if (intervals([4, 7, 11])) return "M7";
  else if (intervals([3, 7, 10])) return "m7";
  else if (intervals([3, 6, 9])) return "°7";
  else if (intervals([3, 6, 10])) return "m7b5";
  else if (intervals([4, 7, 10])) return "D";
  else if (intervals([4, 7, NaN])) return "M";
  else if (intervals([4, 8, NaN])) return "+";
  else if (intervals([3, 7, NaN])) return "m";
  else if (intervals([3, 6, NaN])) return "°";
  else if (
    intervals([2, 7, NaN]) ||
    intervals([2, -5, NaN]) ||
    intervals([-10, -5, NaN])
  )
    return "sus2";
  else if (
    intervals([5, 7, NaN]) ||
    intervals([5, -5, NaN]) ||
    intervals([-7, -5, NaN])
  )
    return "sus4";
};

const Triad = ([root, third, fifth]) => [root, third, fifth];
export const Major7 = ([root]) =>
  [root, root + 4, root + 7, root + 11].map(MaxOfTwelve).map(annotate);
export const Major = (chord) => Triad(Major7(chord));
export const Augmented = ([root]) =>
  [root, root + 4, root + 8].map(MaxOfTwelve).map(annotate);
export const Dominant = ([root]) =>
  [root, root + 4, root + 7, root + 10].map(MaxOfTwelve).map(annotate);
export const Minor7 = ([root]) =>
  [root, root + 3, root + 7, root + 10].map(MaxOfTwelve).map(annotate);
export const Minor = (chord) => Triad(Minor7(chord));
export const HalfDiminished = ([root]) =>
  [root, root + 3, root + 6, root + 10].map(MaxOfTwelve).map(annotate);
export const Diminished7 = ([root]) =>
  [root, root + 3, root + 6, root + 9].map(MaxOfTwelve).map(annotate);
export const Diminished = (chord) => Triad(Diminished7(chord));
export const Sus2 = ([root]) =>
  [root, root + 2, root + 7].map(MaxOfTwelve).map(annotate);
export const Sus4 = ([root]) =>
  [root, root + 5, root + 7].map(MaxOfTwelve).map(annotate);

export default {
  Major7,
  Minor7,
  Augmented,
  Dominant,
  Diminished,
  Diminished7,
  HalfDiminished,
  Sus2,
  Sus4,
  Major,
  Minor
};
