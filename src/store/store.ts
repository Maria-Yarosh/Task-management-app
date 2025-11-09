import { configureStore } from '@reduxjs/toolkit'
import { registerReducer } from '../features/register/model/slice'
import { authReducer } from '../features/login/model/slice'


export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch