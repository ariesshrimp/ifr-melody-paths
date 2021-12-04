import * as Constants from "./constants";
import * as Forms from "react-hook-form";
import * as Icons from "@mui/icons-material";
import * as MU from "@mui/material";
import * as Player from "./player";
import * as R from "ramda";
import * as Router from "react-router-dom";
import * as Tone from "tone";
import ChordQualities from "./qualities";
import ProgressionEntry from "./components/progression-entry";
import React from "react";

const useFetch = ({ url = "", options }) => {
  const [results, saveResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, saveError] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options || {});
        const result = await response.json();
        saveResults(result);
      } catch (e) {
        saveError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [options, url]);
  return { results, loading, error };
};

const colorByNumber = (chord) => {
  const cCount = Constants.ORDERED_CHORD_FUNCTION_NAMES.length;
  const cIndex = Constants.ORDERED_CHORD_FUNCTION_NAMES.findIndex(
    R.equals(chord)
  );
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

export default function App() {
  const qualities = Object.values(ChordQualities);
  const chords = Constants.ORDERED_CHORD_FUNCTION_NAMES;

  const [quality, updateQuality] = React.useState(qualities[0].name);
  const [chord, updateChord] = React.useState(chords[0]);
  const [visible, updateVisibility] = React.useState(true);
  const [firstLoad, trackFirstLoad] = React.useState(true);
  const [playing, togglePlaying] = React.useState(false);

  const form = Forms.useForm({
    defaultValues: {
      chord_selections: [{ chord, quality }],
      bpm: 85,
      key: "C",
      instrument: "pad_2_warm",
      attack: 0.1,
      decay: 0.3,
      sustain: 1,
      release: 0.6
    }
  });

  const fields = Forms.useFieldArray({
    control: form.control,
    name: "chord_selections"
  });

  const { results: instruments, loading: instrumentsLoading } = useFetch({
    url:
      "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/names.json?raw=true"
  });

  const {
    chord_selections = [],
    bpm,
    key,
    instrument,
    attack,
    decay,
    sustain,
    release
  } = form.watch();
  const envelope = Player.useAmplitudeEnvelope({
    attack,
    decay,
    sustain,
    release
  });
  const { sampler, loading: samplerLoading } = Player.useSounds({ instrument });

  // React.useEffect(() => {
  //   if (sampler.current && envelope.current)
  //     sampler.current.connect(envelope.current);
  // }, [sampler, envelope]);

  Player.useProgression({
    chords: chord_selections,
    player: sampler.current,
    key
  });

  const transport = Player.useTransport({ bpm });

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

  const navigate = Router.useNavigate();
  const location = Router.useLocation();

  React.useEffect(() => {
    if (firstLoad) {
      trackFirstLoad(false);
      if (location.hash) {
        const json = decodeURIComponent(location.hash).split("#")[1];
        const selections = JSON.parse(json);

        form.resetField("chord_selections", { defaultValue: selections });
        updateChord(R.last(selections).chord);
        updateQuality(R.last(selections).quality);
      }
    }
  }, [location.hash, fields.fields, form, firstLoad]);

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      const selections = values["chord_selections"];
      const encoded = encodeURIComponent(JSON.stringify(selections));
      navigate(`#${encoded}`, { replace: true, state: selections });
    });
    return () => subscription.unsubscribe();
  }, [form, navigate]);

  const loading = samplerLoading || instrumentsLoading;
  return loading ? (
    "loading..."
  ) : (
    <MU.Grid container direction="column" spacing={6} sx={{ padding: "1em" }}>
      <MU.Grid item component={MU.Typography} variant="h2" xs>
        IFR Melody Paths
      </MU.Grid>
      <MU.Grid
        item
        container
        spacing={1}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <MU.Grid item component={MU.FormControl} size="small" xs fullWidth>
          <MU.InputLabel id="chord-quality-select-label">
            Chord Quality (least to most tension)
          </MU.InputLabel>
          <MU.Select
            size="small"
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
        <MU.Grid item component={MU.FormControl} size="small" xs fullWidth>
          <MU.InputLabel id="chord-number-select-label">
            Diatonic Chord Function
          </MU.InputLabel>
          <MU.Select
            defaultValue={chords[0]}
            fullWidth
            size="small"
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
        <MU.Grid sx={{ width: "unset" }} item container direction="column">
          <MU.Tooltip title="Add chord to progression" placement="top">
            <MU.Grid item xs>
              <MU.Button
                variant="contained"
                onClick={() => fields.append({ chord, quality })}
              >
                <Icons.Add />
              </MU.Button>
            </MU.Grid>
          </MU.Tooltip>
          <MU.Tooltip title="Start over">
            <MU.Grid item xs>
              <MU.Button
                variant="contained"
                color="error"
                onClick={() =>
                  form.resetField("chord_selections", {
                    defaultValue: [{ chord, quality }]
                  })
                }
              >
                <Icons.Delete />
              </MU.Button>
            </MU.Grid>
          </MU.Tooltip>
        </MU.Grid>
        <MU.Grid
          sx={{ width: "unset", margin: "0 1em" }}
          item
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <MU.InputLabel id="attack-select-label">Attack</MU.InputLabel>
          <Forms.Controller
            control={form.control}
            name="attack"
            render={({ field }) => {
              return (
                <MU.Slider min={0} max={1} sx={{ flexGrow: 1 }} {...field} />
              );
            }}
          />

          <MU.InputLabel id="decay-select-label">Decay</MU.InputLabel>
          <Forms.Controller
            control={form.control}
            name="decay"
            render={({ field }) => {
              return (
                <MU.Slider min={0} max={1} sx={{ flexGrow: 1 }} {...field} />
              );
            }}
          />

          <MU.InputLabel id="sustain-select-label">Sustain</MU.InputLabel>
          <Forms.Controller
            control={form.control}
            name="sustain"
            render={({ field }) => {
              return (
                <MU.Slider min={0} max={1} sx={{ flexGrow: 1 }} {...field} />
              );
            }}
          />

          <MU.InputLabel id="release-select-label">Release</MU.InputLabel>
          <Forms.Controller
            control={form.control}
            name="release"
            render={({ field }) => {
              return (
                <MU.Slider min={0} max={1} sx={{ flexGrow: 1 }} {...field} />
              );
            }}
          />
        </MU.Grid>
        <MU.Grid
          sx={{ width: "unset", margin: "0 1em" }}
          item
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Forms.Controller
            control={form.control}
            name="key"
            render={({ field }) => {
              return (
                <MU.Select sx={{ flexGrow: 1 }} {...field}>
                  {Constants.KEYS.map((key) => {
                    return (
                      <MU.MenuItem
                        key={`key-selection-option-${key}`}
                        value={key}
                      >
                        {key}
                      </MU.MenuItem>
                    );
                  })}
                </MU.Select>
              );
            }}
          />
        </MU.Grid>
        <MU.Grid
          sx={{ width: "unset", margin: "0 1em" }}
          item
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Forms.Controller
            control={form.control}
            name="instrument"
            render={({ field }) => {
              return (
                <MU.Select sx={{ flexGrow: 1 }} {...field}>
                  {instruments.sort().map((instrument) => {
                    return (
                      <MU.MenuItem
                        key={`${instrument}-option`}
                        value={instrument}
                      >
                        {instrument}
                      </MU.MenuItem>
                    );
                  })}
                </MU.Select>
              );
            }}
          />
        </MU.Grid>
        <MU.Grid
          sx={{ width: "unset", margin: "0 1em" }}
          item
          container
          direction="column"
        >
          <MU.Grid item xs>
            <MU.Tooltip title="Play progression">
              <MU.Grid item xs>
                <MU.Button
                  variant="contained"
                  color={playing ? "warning" : "primary"}
                  onClick={() => {
                    togglePlaying(!playing);
                    if (!playing) {
                      Tone.context.resume();
                      transport.current.start();
                    } else {
                      transport.current.pause();
                    }
                  }}
                >
                  {playing ? <Icons.Pause /> : <Icons.PlayArrow />}
                </MU.Button>
              </MU.Grid>
            </MU.Tooltip>
            <MU.Typography>{form.getValues().bpm}bpm</MU.Typography>
            <MU.Tooltip title="Set bpm">
              <MU.Slider step={1} {...form.register("bpm")} />
            </MU.Tooltip>
          </MU.Grid>
        </MU.Grid>
        <MU.Tooltip title="Hide controls">
          <MU.Grid
            item
            container
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
            <MU.Grid
              justifyContent="center"
              container
              direction="row"
              wrap="nowrap"
            >
              <Icons.DisplaySettings
                size="xs"
                color={visible ? "primary" : "disabled"}
              />
              {visible ? (
                <Icons.VisibilityOff size="xs" color="primary" />
              ) : (
                <Icons.Visibility
                  size="xs"
                  color={visible ? "primary" : "disabled"}
                />
              )}
            </MU.Grid>
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
