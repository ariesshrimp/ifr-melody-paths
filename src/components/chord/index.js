/** @jsxImportSource @emotion/react */
import React from "react";
import {
  nameNotesAsNaturals,
  complete
} from "../../formulas";
import ChordQualities from "../../qualities";
import * as MU from "@mui/material";
import * as Constants from '../../constants'
import Note from '../note'

export default ({ chord, quality }) => {
  const qFunc = ChordQualities[quality];
  const qualified = qFunc(Constants.ALL_CHORDS[chord]);
  const namedNotes = nameNotesAsNaturals(qualified);
  const completed = complete(namedNotes);

  return (
    <MU.Box
      component="ul"
      sx={{
        alignItems: "center",
        alignSelf: "center",
        boxSizing: "border-box",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        listStyle: "none",
        marginBlockEnd: 0,
        marginBlockStart: 0,
        minWidth: 0,
        padding: 0,
        textAlign: "center"
      }}
    >
      {completed.map((note, index) => (
        <Note key={`note-${chord}-${quality}-${note}-${index}`} {...note} />
      ))}
      <Note {...completed[0]} />
    </MU.Box>
  );
};