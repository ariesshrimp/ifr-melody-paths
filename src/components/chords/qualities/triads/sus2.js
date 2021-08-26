import ChordStack from "../../../chord-stack";
import chordMapper from "../chord-mapper";

export default () => {
  return <ChordStack chordTones={chordMapper([1, 2, 5])} />;
};
