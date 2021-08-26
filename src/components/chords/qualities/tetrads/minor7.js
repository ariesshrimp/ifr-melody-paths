import ChordStack from "../../../chord-stack";
import chordMapper from "../chord-mapper";

export default () => {
  return (
    <ChordStack
      flats={chordMapper([3, 7])}
      chordTones={chordMapper([1, 3, 5, 7])}
    />
  );
};
