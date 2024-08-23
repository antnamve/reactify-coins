import { loadInitialState } from '@/app/helpers/loadInitialState'
import { ShortPosition } from '@/entities/shortPosition/model/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Coin, CoinsState, GetCoinsData } from './types'

const initialState: CoinsState = {
	shortPositions: loadInitialState('shortPositions'),
	activities: loadInitialState('activities'),
}

export const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		openShortTrade: (
			state,
			action: PayloadAction<{
				amount: number
				data: Coin
				timestamp: string
			}>
		) => {
			const { amount, data } = action.payload
			const activityEntry = {
				coin: data,
				amount,
				status: 'Opened',
				timestamp: new Date().toLocaleString(),
				gain: null,
			} as const

			state.shortPositions.push(action.payload)
			state.activities.push(activityEntry)

			localStorage.setItem(
				'shortPositions',
				JSON.stringify(state.shortPositions)
			)
			localStorage.setItem('activities', JSON.stringify(state.activities))
		},

		closeShortTrade: (
			state,
			action: PayloadAction<{
				timestamp: string
				coin: ShortPosition
				oldCoins: ShortPosition[]
				newCoins: GetCoinsData | undefined
				currency: string
			}>
		) => {
			const { timestamp, coin, oldCoins, newCoins, currency } = action.payload
			const oldCoin = oldCoins.find(item => item.data.name === currency)
			const newCoin = newCoins?.coins.find(item => item.name === currency)

			if (!oldCoin || !newCoin) return

			const gain = Number(oldCoin.data.price) - Number(newCoin.price)

			const updatedCoins = oldCoins.filter(
				(item: ShortPosition) => item.timestamp !== timestamp
			)

			localStorage.setItem('shortPositions', JSON.stringify(updatedCoins))

			const activityEntry = {
				status: 'Closed',
				timestamp: new Date().toLocaleString(),
				coin: coin.data,
				amount: oldCoin.amount,
				gain,
			} as const

			state.activities.push(activityEntry)

			state.shortPositions = updatedCoins
		},
	},
})

export const { openShortTrade, closeShortTrade } = coinsSlice.actions

export default coinsSlice.reducer
