import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../utils/utilsCookies'


const initialState = {
    "id": null,
    "email": null,
    "username": null,
    "avatar": null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => {
            // sets a user as session user without loging in
            state.user = action.payload
        },
        login: (state, action) => {
            (async () => {
                const res = await fetch('http://127.0.0.1:8000/api/session/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify(action.payload),
                })
                const data = await res.json()
                if (data.success) {
                    alert('Succesfully logged in')
                } else {
                    alert('Failed to logged in (wrong information)')
                }
                // payload: {email: '', password: '',}
                // res: {success: Bool}
            })()
            state.user = action.payload
        },
        logout: (state, action) => {
            (async () => {
                await fetch('http://127.0.0.1:8000/api/session/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify({ email: null }),
                })
                // if backend recieves { email: null } it logs the curr user out
            })()
            state.user = initialState
        }
    }
})

export const actions = userSlice.actions;
export default userSlice.reducer;