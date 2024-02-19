import React from "react";
import { useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const UseReducerDemoComponent = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 }); // using useReducer instead of useState hook

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  return (
    <div className="d-flex">
      <h4>Count: {state.count}</h4>
      <button className="btn btn-danger mx-3" onClick={increment}>
        + Increment
      </button>
    </div>
  );
};

export default UseReducerDemoComponent;
