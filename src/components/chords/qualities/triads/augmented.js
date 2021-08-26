import ChordStack from "../../../chord-stack";
import chordMapper from "../chord-mapper";

export default () => {
  return (
    <ChordStack sharps={chordMapper([5])} chordTones={chordMapper([1, 3, 5])} />
  );
};
