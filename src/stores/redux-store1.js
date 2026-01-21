import { createStore } from "redux";

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  // trigger when we dispatch
  switch (action.type) {
    case "INCREMENT":
      state.count++;
      return { ...state };
    case "DECREMENT":
      if (state.count <= 0) {
        return state;
      }
      state.count--;
      return { ...state };
    case "INCREASE":
      state.count += action.amount;
      return { ...state };
    default:
      return state;
  }
};

const store = createStore(counterReducer); // create redux store

export default store;
