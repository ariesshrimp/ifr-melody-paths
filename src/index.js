import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CssBaseline>
      <DndProvider
        backend={HTML5Backend}
        options={{ enableTouchEvents: true, enableMouseEvents: true }}
      >
        <App />
      </DndProvider>
    </CssBaseline>
  </StrictMode>,
  rootElement
);
