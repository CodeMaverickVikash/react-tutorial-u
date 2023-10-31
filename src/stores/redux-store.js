import { createStore } from "redux";

const counterReducer = (state = { count: 0 }, action) => { // trigger when we dispatch
  switch (action.type) {
    case "INCREMENT":
      state.count++;
      return state;
    case "DECREMENT":
      if(state.count <= 0) {
        return state;
      } 
      state.count--;
      return state;
    default:
      return state;
  }
};

const store = createStore(counterReducer); // create redux store

export default store;
