/** @jsxImportSource @emotion/react */
import React from "react";
import {
  nameNotesAsNaturals,
  DiatonicChords,
  NonDiatonicChords,
  complete
} from "./formulas";
import ChordQualities from "./qualities";
import * as MU from "@mui/material";
import * as Icons from "@mui/icons-material";
import * as Forms from "react-hook-form";
import * as R from "ramda";
import * as DnD from "react-dnd";
import { css, keyframes } from "@emotion/react";
import * as Animations from "react-animations";

const AllChords = R.merge(DiatonicChords, NonDiatonicChords);
const sortedChordNames = [
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
const stringify = (accidentals) => {
  return accidentals.reduce((result, current) => {
    return `${current}${result}`;
  }, "");
};

const Note = ({ chordTone, name, value, accidentals = [] }) => {
  const accidentalSymbols = stringify(accidentals);
  return (
    <MU.Box
      component={"li"}
      sx={{
        listStylePosition: "outside",
        minWidth: 0,
        textAlign: "center",
        ...(chordTone
          ? { color: "white", fontWeight: "bold", fontSize: "1.2em" }
          : {})
      }}
      key={`${accidentalSymbols}-${name}-${value}`}
    >
      <MU.Typography>{`${accidentalSymbols}${name}`}</MU.Typography>
    </MU.Box>
  );
};

const colorByNumber = (chord) => {
  const cCount = sortedChordNames.length;
  const cIndex = sortedChordNames.findIndex(R.equals(chord));
  const x = cIndex / cCount;
  const maxRange = 0 / cCount;
  const minRange = (cCount - 1) / cCount;
  const min = 0.25;
  const max = 1;
  const alpha = ((maxRange - minRange) * (x - min)) / (max - min) + minRange;
  return alpha;
};

const colorByQuality = (quality) => {
  const qNames = Object.keys(ChordQualities);
  const qCount = qNames.length;
  const qIndex = qNames.findIndex(R.equals(quality));
  const k = Math.round(255 / qCount);
  return [k * qIndex, 255 - k * qIndex];
};
const chordColors = (quality, chord) => {
  const [red, blue] = colorByQuality(quality);
  const green = 0;
  const alpha = colorByNumber(chord);
  const result = `rgba(${red},${green},${blue},${alpha})`;
  return result;
};

const Chord = ({ chord, quality }) => {
  const qFunc = ChordQualities[quality];
  const qualified = qFunc(AllChords[chord]);
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

const translate = (chordName) => {
  switch (chordName) {
    case "One":
      return "1";
    case "SharpOne":
      return "#1";
    case "Two":
      return "2";
    case "SharpTwo":
      return "#2";
    case "Three":
      return "3";
    case "Four":
      return "4";
    case "SharpFour":
      return "#4";
    case "Five":
      return "5";
    case "SharpFive":
      return "#5";
    case "Six":
      return "6";
    case "SharpSix":
      return "#6";
    case "Seven":
      return "7";
    default:
      return chordName;
  }
};

const ProgressionEntry = ({ chord, quality, fields, index }) => {
  const ref = React.useRef();
  const isLast = index === fields.fields.length - 1;

  const [{ opacity }, drag] = DnD.useDrag(
    () => ({
      type: "chord",
      item: () => {
        return { index };
      },
      canDrag: () => !isLast,
      collect: (monitor) => ({
        opacity: !!monitor.isDragging() ? 0.5 : 1
      })
    }),
    [index, isLast]
  );
  const [{ isActive }, drop] = DnD.useDrop(
    () => ({
      accept: "chord",
      drop: (target) => {
        fields.move(target.index, index);
      },
      collect: (monitor) => ({
        isActive: monitor.isOver()
      })
    }),
    [index, fields]
  );

  drag(drop(ref));
  const qFunc = ChordQualities[quality];
  return (
    <MU.Card
      square
      raised={isActive}
      ref={ref}
      sx={{
        background: chordColors(qFunc.name, chord),
        cursor: isLast ? "not-allowed" : "move",
        display: "flex",
        flexFlow: "column",
        opacity,
        position: "relative",
        width: "25%"
      }}
      css={
        isLast
          ? css`
              animation: 2s ${keyframes`${Animations.pulse}`} infinite;
            `
          : css``
      }
    >
      {!isLast ? (
        <MU.Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            position: "absolute"
          }}
        >
          <MU.Grid
            item
            component={MU.IconButton}
            size="small"
            variant="contained"
            onClick={() => fields.remove(index)}
            sx={{
              backgroundColor: "transparent"
            }}
          >
            <Icons.Clear />
          </MU.Grid>
          <MU.Grid
            item
            component={MU.IconButton}
            size="small"
            variant="contained"
            onClick={() => fields.insert(index + 1, { chord, quality })}
            sx={{
              backgroundColor: "transparent"
            }}
          >
            <Icons.LibraryAddTwoTone />
          </MU.Grid>
          {index > 0 ? (
            <MU.Grid
              item
              component={MU.IconButton}
              size="small"
              variant="contained"
              onClick={() => fields.move(index, index - 1)}
              sx={{
                backgroundColor: "transparent"
              }}
            >
              <Icons.ArrowLeftTwoTone />
            </MU.Grid>
          ) : null}
          {index < fields.fields.length - 2 ? (
            <MU.Grid
              item
              component={MU.IconButton}
              size="small"
              variant="contained"
              onClick={() => fields.move(index, index + 1)}
              sx={{
                backgroundColor: "transparent"
              }}
            >
              <Icons.ArrowRightTwoTone />
            </MU.Grid>
          ) : null}
        </MU.Grid>
      ) : null}
      <Chord chord={chord} quality={quality} />
    </MU.Card>
  );
};

export default function App() {
  const qualities = Object.values(ChordQualities);
  const chords = sortedChordNames;

  const [quality, updateQuality] = React.useState(qualities[0].name);
  const [chord, updateChord] = React.useState(chords[0]);
  const [visible, updateVisibility] = React.useState(true);

  const form = Forms.useForm({
    defaultValues: {
      "chord-selections": [{ chord, quality }]
    }
  });
  const fields = Forms.useFieldArray({
    control: form.control,
    name: "chord-selections"
  });

  const handleQualitySelection = (e) =>
    updateQuality(() => {
      const quality = e.target.value;
      fields.update(fields.fields.length - 1, { chord, quality });
      return quality;
    });

  const handleChordSelection = (e) =>
    updateChord(() => {
      const chord = e.target.value;
      fields.update(fields.fields.length - 1, { chord, quality });
      return chord;
    });

  return (
    <MU.Grid container direction="column" spacing={1} sx={{ padding: "1em" }}>
      <MU.Grid
        item
        container
        spacing={1}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <MU.Grid item component={MU.FormControl} xs fullWidth>
          <MU.InputLabel id="chord-quality-select-label">
            Chord Quality (least to most tension)
          </MU.InputLabel>
          <MU.Select
            defaultValue={qualities[0].name}
            fullWidth
            id="chord-quality-select"
            labelId="chord-quality-select-label"
            onChange={handleQualitySelection}
            value={quality}
            variant="outlined"
          >
            {qualities.map((quality, index) => {
              const [r, b] = colorByQuality(quality.name);
              return (
                <MU.MenuItem
                  sx={{
                    backgroundColor: `rgba(${r},0,${b},${colorByNumber(chord)})`
                  }}
                  key={`qualitySelection-${quality}-${index}`}
                  value={quality.name}
                >
                  {quality.name}
                </MU.MenuItem>
              );
            })}
          </MU.Select>
        </MU.Grid>

        <MU.Grid item component={MU.FormControl} xs fullWidth>
          <MU.InputLabel id="chord-number-select-label">
            Diatonic Chord Function
          </MU.InputLabel>
          <MU.Select
            defaultValue={chords[0]}
            fullWidth
            id="chord-number-select"
            labelId="chord-number-select-label"
            onChange={handleChordSelection}
            value={chord}
            variant="outlined"
          >
            {chords.map((chord, index) => {
              const [r, b] = colorByQuality(quality);
              return (
                <MU.MenuItem
                  sx={{
                    backgroundColor: `rgba(${r},0,${b},${colorByNumber(chord)})`
                  }}
                  key={`chordSelection-${chord}-${index}`}
                  value={chord}
                >
                  {translate(chord)}
                </MU.MenuItem>
              );
            })}
          </MU.Select>
        </MU.Grid>
        <MU.Tooltip title="Add chord">
          <MU.Grid
            item
            sx={{ margin: "10px" }}
            component={MU.Button}
            variant="contained"
            onClick={() => fields.append({ chord, quality })}
          >
            <Icons.Add />
          </MU.Grid>
        </MU.Tooltip>
        <MU.Tooltip title="Hide preview">
          <MU.Grid
            item
            container
            component={MU.Card}
            direction="column-reverse"
            justifyContent="center"
            alignItems="center"
            wrap="nowrap"
            sx={{ width: "unset" }}
          >
            <MU.Grid
              item
              sx={{ margin: "10px" }}
              component={MU.Switch}
              checked={visible}
              size="xs"
              onChange={() => updateVisibility(!visible)}
            />
            {visible ? (
              <Icons.VisibilityOff size="xs" color="primary" />
            ) : (
              <Icons.Visibility size="xs" color="primary" />
            )}
          </MU.Grid>
        </MU.Tooltip>
      </MU.Grid>
      <MU.Grid
        item
        xs
        component={MU.Box}
        sx={{
          alignItems: "stretch",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "stretch"
        }}
      >
        {fields.fields.map(({ chord, quality, id }, index) => {
          return index === fields.fields.length - 1 && !visible ? null : (
            <ProgressionEntry
              chord={chord}
              fields={fields}
              index={index}
              key={id}
              quality={quality}
            />
          );
        })}
      </MU.Grid>
    </MU.Grid>
  );
}
