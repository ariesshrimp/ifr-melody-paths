import * as MU from '@mui/material'

const stringify = (accidentals) => {
  return accidentals.reduce((result, current) => {
    return `${current}${result}`;
  }, "");
};

export default ({ chordTone, name, value, accidentals = [] }) => {
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