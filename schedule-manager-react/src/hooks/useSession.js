import { useEffect } from "react"
import { useSelector } from "react-redux"
import { actions } from '../slices/userSlice'

// fetches data of current session and passes it to the state
export const useGetSession = (dispatch) => {
    useEffect(() => {
        (async () => {
            const res = await fetch('http://127.0.0.1:8000/api/session/')
            const data = await res.json()
            dispatch(actions.set(data))
        })()
    }, [dispatch])
    const user = useSelector((state) => state.user)
    return user
}
