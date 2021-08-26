import React from "react";
import "./styles.css";
import { nameNotesAsNaturals, DiatonicChords, complete } from "./formulas";
import ChordQualities from "./qualities";

const stringify = (accidentals) => {
  return accidentals.reduce((result, current) => {
    return `${current}${result}`;
  }, "");
};

const Note = ({ chordTone, name, value, accidentals = [] }) => {
  const accidentalSymbols = stringify(accidentals);
  return (
    <li
      className={chordTone ? "chordTone" : ""}
      key={`${accidentalSymbols}-${name}-${value}`}
    >
      {`${accidentalSymbols}${name}`}
    </li>
  );
};

const Chord = ({ chord, quality }) => {
  const qualified = quality(chord);
  const namedNotes = nameNotesAsNaturals(qualified);
  const completed = complete(namedNotes);
  return (
    <ul style={{ background: "salmon" }}>
      {completed.map(Note)}
      <Note {...completed[0]} />
    </ul>
  );
};

export default function App() {
  const qualities = Object.values(ChordQualities);
  const chords = Object.keys(DiatonicChords);
  const renderQualities = React.useCallback(
    () =>
      qualities.map((quality) => {
        return <option value={quality.name}>{quality.name}</option>;
      }),
    [qualities]
  );
  const [quality, updateQuality] = React.useState(qualities[0].name);
  const [chord, updateChord] = React.useState(chords[0]);
  const renderChords = React.useCallback(() => {
    return chords.map((chord) => {
      return <option value={chord}>{chord}</option>;
    });
  }, [chords]);
  const handleQualitySelection = (e) => {
    updateQuality(e.target.value);
  };
  const handleChordSelection = (e) => {
    updateChord(e.target.value);
  };
  return (
    <div style={{ display: "flex" }}>
      <select
        defaultValue={qualities[0].name}
        onChange={handleQualitySelection}
      >
        {renderQualities()}
      </select>
      <select defaultValue={chords[0]} onChange={handleChordSelection}>
        {renderChords()}
      </select>
      <Chord chord={DiatonicChords[chord]} quality={ChordQualities[quality]} />

      {/* {Object.values(ChordQualities).map((quality) => (
        <Chord key={quality} chord={DiatonicChords.One} quality={quality} />
      ))} */}
    </div>
  );
}

// export default function App() {
//   const chords = Object.values(DiatonicChords);
//   const qualities = Object.values(ChordQualities);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "stretch",
//         justifyContent: "stretch"
//       }}
//     >
//       {chords.map((chord, index) => {
//         return (
//           <div
//             style={{
//               display: "flex",
//               flexGrow: 1,
//               alignItems: "stretch",
//               justifyContent: "stretch"
//             }}
//           >
//             {qualities.map((quality) => {
//               return (
//                 <div
//                   style={{
//                     flexGrow: 1,
//                     background: "salmon",
//                     textAlign: "center"
//                   }}
//                 >
//                   <span>
//                     {index + 1} {quality.name}
//                   </span>
//                   <Chord chord={chord} quality={quality} />
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
