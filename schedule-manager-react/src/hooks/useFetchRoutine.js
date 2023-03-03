import { useEffect } from "react"
import { useSelector } from "react-redux"
import { actions } from '../slices/scheduleSlice'

// fetches data of current session and passes it to the state
export const useGetRoutineById = (dispatch, id) => {
    useEffect(() => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_HOST_URL + `/api/routine/${id}`)
            const data = await res.json()
            dispatch(actions.setSchedule({ scheduleOptions: data.scheduleOptions, taskList: data.taskList }))
        })()
    }, [dispatch, id])
    const routine = useSelector((state) => state.schedule)
    return routine
}
