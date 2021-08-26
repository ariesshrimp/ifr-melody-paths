import ChordStack from "../../../chord-stack";
import chordMapper from "../chord-mapper";

export default () => {
  return (
    <ChordStack flats={chordMapper([3])} chordTones={chordMapper([1, 3, 5])} />
  );
};
