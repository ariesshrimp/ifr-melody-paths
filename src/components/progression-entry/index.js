/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import * as Animations from "react-animations";
import * as Constants from '../../constants'
import * as DnD from "react-dnd";
import * as Icons from "@mui/icons-material";
import * as MU from "@mui/material";
import * as R from "ramda";
import Chord from '../chord'
import ChordQualities from "../../qualities";
import React from "react";

const colorByNumber = (chord) => {
  const cCount = Constants.ORDERED_CHORD_FUNCTION_NAMES.length;
  const cIndex = Constants.ORDERED_CHORD_FUNCTION_NAMES.findIndex(R.equals(chord));
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

const translateQ = (quality) => {
  switch (quality) {
    case "Major7":
      return "M7";
    case "Major":
      return "";
    case "Minor":
      return "–";
    case "Minor7":
      return "–7";
    case "Diminished7":
      return "°7";
    case "HalfDiminished":
      return "–7♭5";
    case "Augmented":
      return "+";
    case "Diminished":
      return "°";
    case "Dominant":
      return "7";
    case "Sus2":
      return "sus2";
    case "Sus4":
      return "sus4";
    default:
      return quality;
  }
};

export default ({ chord, quality, fields, index }) => {
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
      <MU.Typography
        variant="h5"
        sx={{
          color: "rgba(255,255,255,0.6)",
          position: "absolute",
          right: 0,
          paddingRight: "5px"
        }}
      >
        {`${translate(chord)}`}
        <sup>
          <MU.Typography variant="subtitle2" sx={{ display: "inline" }}>
            {translateQ(quality)}
          </MU.Typography>
        </sup>
      </MU.Typography>
    </MU.Card>
  );
};