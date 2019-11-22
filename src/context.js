import React, { useReducer } from "react";

const GlobalContext = React.createContext();

const initialState = {
  foo: 0,
  bar: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_FOO":
      return { ...state, foo: (state.foo += 1) };
    case "INCREMENT_BAR":
      return { ...state, bar: (state.bar += 1) };
    default:
      return state;
  }
};

const EnhancedProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalContext.EnhancedProvider = EnhancedProvider;

export { GlobalContext };
export default GlobalContext;
