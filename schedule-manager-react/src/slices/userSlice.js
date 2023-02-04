import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../hooks/useCookies'

const user = getCookie('user')
const initialState = { username: user ? user : null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload
        },
        logout: (state, action) => {
            state.username = null
        }
    }
})

export const actions = userSlice.actions;
export default userSlice.reducer;