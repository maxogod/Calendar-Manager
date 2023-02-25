import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import scheduleReducer from '../slices/scheduleSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
    },
})

export default store;