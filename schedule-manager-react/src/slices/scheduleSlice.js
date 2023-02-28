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
            state.scheduleOptions = action.payload.scheduleOptions
            state.taskList = action.payload.taskList
        },
        saveSchedule: (state) => {
            (async () => {
                const res = await fetch(process.env.REACT_APP_HOST_URL + '/api/routine/create/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify(
                        {
                            name: state.scheduleOptions.name,
                            sleep_schedule: state.scheduleOptions.sleep_schedule,
                            sleep_time: Number(state.scheduleOptions.sleep_time),
                            bed_time: state.scheduleOptions.bed_time,
                            tasks: state.taskList
                        }
                    ),
                })
                if (res.status === 201) {
                    alert('Routine was successfully created!')
                } else {
                    alert('There was an error in the creation of this routine..')
                }
            })()
        },
    }
})

export const actions = scheduleSlice.actions;
export default scheduleSlice.reducer;
