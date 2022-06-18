import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { increase } = user.actions;

let players = createSlice({
  name: "players",
  initialState: [],
  reducers: {
    pushCount(state, action) {
      let nums = state.findIndex((a) => a.id == action.payload.id);
      if (nums >= 0) {
        state[nums].count++;
      } else {
        state.push(action.payload);
      }
    },
    addCount(state, action) {
      let nums = state.findIndex((a) => a.id === action.payload);
      state[nums].count++;
    },
    minusCount(state, action) {
      let nums = state.findIndex((a) => a.id === action.payload);
      if (state[nums].count > 1) state[nums].count--;
    },
    deleteCount(state, action) {
      action.payload.remove();
    },
  },
});

export let { pushCount, addCount, minusCount, deleteCount } = players.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    players: players.reducer,
  },
});
