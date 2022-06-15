import { configureStore, createSlice } from '@reduxjs/toolkit'




let user = createSlice({
  name : 'user',
  initialState : {name: 'kim', age: 20},
  reducers : {
    increase(state, action) {
      state.age += action.payload;
    }
  }
})

export let { increase } = user.actions;

let players = createSlice({
  name : 'players',
  initialState :  [  {
    id : 0,
    name : 'Mohamed Salah',
    count : 1
  },
  {
    id : 1,
    name : 'Sadio Mane',
    count: 1
  }
  ],
  reducers : {
      pushCount(state, action) {
        state.push(action.payload);
        console.log(state[1])
      },
      addCount(state, action) {
        let nums = state.findIndex((a) => { return a.id === action.payload })
        state[nums].count++
      },
      minusCount(state, action) {
        let nums = state.findIndex((a) => { return a.id === action.payload })
        state[nums].count--
      },
      deleteCount(state, action) {
        action.payload.remove();
      }
  }
})

export let {  pushCount, addCount, minusCount, deleteCount  } = players.actions;
 
export default configureStore({
  reducer: {
    user : user.reducer,
    players : players.reducer
   }
}) 


