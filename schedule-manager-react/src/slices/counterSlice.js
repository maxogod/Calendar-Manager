import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0 }

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.counter += 1
        },
        dec: (state, action) => {
            state.counter -= 1
        }
    }
})

export const actions = counterSlice.actions;
export default counterSlice.reducer;