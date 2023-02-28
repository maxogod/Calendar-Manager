import { useEffect } from "react"
import { useSelector } from "react-redux"
import { actions } from '../slices/userSlice'

// fetches data of current session and passes it to the state
export const useGetSession = (dispatch) => {
    useEffect(() => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_HOST_URL + '/api/session/')
            const data = await res.json()
            dispatch(actions.set(data.user))
            dispatch(actions.setSchedules(data.schedules))
        })()
    }, [dispatch])
    const user = useSelector((state) => state.user).user
    return user
}
