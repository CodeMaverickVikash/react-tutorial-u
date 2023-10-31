import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    increase(state, action) {
      state.count += action.payload;
    },
  },
});

const store = configureStore({ // configure redux store
  reducer: { counter: counterSlice.reducer },
});

export const counterActions = counterSlice.actions;
export default store;
