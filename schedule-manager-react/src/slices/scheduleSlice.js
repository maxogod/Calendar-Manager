import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../utils/utilsCookies'

const initialState = {
    scheduleOptions: {},
    taskList: [], // Each task being an object with its options
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setSchedule: (state, action) => {
            state.schedule = action.payload
        },
        saveSchedule: (state, action) => {
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
            })()
            /* 
            {
                name: '',
                sleep_schedule: 'NIGHT/DAY',
                unavailability: null/[[x, y], [i, k]],
                sleep_time: number,
                bed_time: number,

                tasks: [
                    {
                        title: '',
                        description: '',
                        days_a_week: number,
                        starttime: number/null,
                        endtime: number/null,
                        importance: number,
                    },
                    {
                        title: '',
                        description: '',
                        days_a_week: number,
                        starttime: number/null,
                        endtime: number/null,
                        importance: number,
                    }
                ]
            }
            */
        },
    }
})

export const actions = scheduleSlice.actions;
export default scheduleSlice.reducer;
