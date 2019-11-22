import React from "react";
import ReactDOM from "react-dom";
import GlobalContext from "./context";
import { withContextPortal } from "./hoc";
import "./index.css";

const Incrementor = props => {
  return (
    <div>
      <button
        onClick={() => {
          props.dispatch({
            type: `INCREMENT_${props.name}`
          });
        }}
      >
        add {props.name}
      </button>
      <pre>{JSON.stringify(props.state, null, "\t")}</pre>
    </div>
  );
};

function ComponentTreeOne(props) {
  return (
    <div style={{ border: "1px solid red", padding: 15 }}>
      <Incrementor name={"FOO"} {...props} />
    </div>
  );
}

function ComponentTreeTwo(props) {
  return (
    <div style={{ border: "1px solid blue", padding: 15 }}>
      <Incrementor name={"BAR"} {...props} />
    </div>
  );
}

/**
 * `Main` creates portals for two components which has NO
 * parent-child relationship
 *
 * it wraps the portal components with global context
 * and renders them
 *
 * `EnhancedProvider` is where our state and reducer lives
 */
const Main = () => {
  const AppOnePortal = withContextPortal(
    GlobalContext,
    ComponentTreeOne,
    document.getElementById("component-one")
  );

  const AppTwoPortal = withContextPortal(
    GlobalContext,
    ComponentTreeTwo,
    document.getElementById("component-two")
  );

  return (
    <GlobalContext.EnhancedProvider>
      <AppOnePortal />
      <AppTwoPortal />
    </GlobalContext.EnhancedProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById("main"));
