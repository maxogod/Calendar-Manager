import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../utils/utilsCookies'


const initialState = {
    user: {
        "id": null,
        "email": null,
        "username": null,
        "avatar": null
    },
    schedules: {
        "id": null,
        "name": null,
        "sleep_schedule": null,
        "sleep_time": null,
        "bed_time": null,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        set: (state, action) => {
            // sets a user as session user without loging in
            state.user = action.payload
        },

        setSchedules: (state, action) => {
            state.schedules = action.payload
        },

        login: (state, action) => {
            (async () => {
                const res = await fetch(process.env.REACT_APP_HOST_URL + '/api/session/', {
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
                    alert('Failed to log in (wrong information)')
                }
                // payload: {email: '', password: '',}
                // res: {success: Bool}
            })()
        },

        logout: (state, action) => {
            (async () => {
                await fetch(process.env.REACT_APP_HOST_URL + '/api/session/', {
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
        },

        register: (state, action) => {
            (async () => {
                const res = await fetch(process.env.REACT_APP_HOST_URL + '/api/register/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify(action.payload),
                })
                // const data = await res.json()
                if (res.status === 201) {
                    alert('Succesfully signed up')
                } else {
                    alert('Failed to sign up')
                }
            })()
        },

        googleOauth: (state, action) => {
            (async () => {
                const res = await fetch(process.env.REACT_APP_HOST_URL + '/api/google_oauth/', {
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
                    alert('Failed to log in')
                }
            })()
        }
    }
})

export const actions = userSlice.actions;
export default userSlice.reducer;