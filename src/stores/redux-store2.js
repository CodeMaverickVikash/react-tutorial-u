import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0, isAuthenticated: false };

const slices = {
  counterSlice: createSlice({
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
  }),
  authSlice: createSlice({
    name: "authentication",
    initialState,
    reducers: {
      onLogin(state) {
        state.isAuthenticated = true;
      },
      onLogout(state) {
        state.isAuthenticated = false;
      },
    },
  }),
};

// configure redux store
const store = configureStore({
  reducer: {
    counter: slices.counterSlice.reducer,
    auth: slices.authSlice.reducer,
  },
});

const counterActions = slices.counterSlice.actions;
const authenticationActions = slices.authSlice.actions;

export {
  counterActions,
  authenticationActions
}

export default store;
