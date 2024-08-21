import { coinsApi } from '@/entities/coins/api/coinsApi'
import coinsReducer from '@/entities/coins/model/coinsSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
	reducer: {
		coins: coinsReducer,
		[coinsApi.reducerPath]: coinsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(coinsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

setupListeners(store.dispatch)
