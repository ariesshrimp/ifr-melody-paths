import * as R from "ramda";

export default ({ flats = {}, sharps = {}, chordTones = {} }) => {
  const allNaturals = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7"
  };

  const notes = R.mapObjIndexed((note, key) => {
    if (flats[key]) return `b${note}`;
    else if (sharps[key]) return `#${note}`;
  }, allNaturals);

  return (
    <ul>
      {Object.values(notes).map((note, index) => {
        if (index === notes.length - 1)
          return (
            <>
              <li key={index} className={!!chordTones[note]}>
                {note}
              </li>
              <li key="last" className={!!chordTones[note]}>
                {notes[1]}
              </li>
            </>
          );
        return (
          <li key={index} className={!!chordTones[note]}>
            {note}
          </li>
        );
      })}
    </ul>
  );
};
