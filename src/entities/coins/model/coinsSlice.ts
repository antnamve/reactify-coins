import { CoinData, Data } from '@/shared/interfaces'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ShortPosition } from './../../../shared/interfaces/index'

const loadInitialState = () => {
	const storedCoins = localStorage.getItem('assets')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const loadInitialShorts = (): ShortPosition[] => {
	const storedCoins = localStorage.getItem('shortPositions')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const loadInitialActivities = () => {
	const storedCoins = localStorage.getItem('activity')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const initialState = {
	coins: loadInitialState(),
	shortPositions: loadInitialShorts(),
	activities: loadInitialActivities(),
}

export const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		shortSellCoin: (
			state,
			action: PayloadAction<{
				amount: number
				data: CoinData
			}>
		) => {
			const { amount, data } = action.payload

			state.shortPositions.push(action.payload)

			const activityEntry = {
				coin: data,
				amount,
				status: 'Opened',
				timestamp: new Date().toLocaleString(),
				gain: null,
			}

			const activity = JSON.parse(localStorage.getItem('activity') || '[]')
			activity.push(activityEntry)

			state.activities.push(activityEntry)

			localStorage.setItem('activity', JSON.stringify(activity))
			localStorage.setItem(
				'shortPositions',
				JSON.stringify(state.shortPositions)
			)
		},

		closeShortTrade: (
			state,
			action: PayloadAction<{
				timestamp: string
				coin: ShortPosition
				oldData: ShortPosition[]
				newData: Data | undefined
				currency: string
			}>
		) => {
			const { timestamp, coin, oldData, newData, currency } = action.payload

			const oldCoin = oldData.find(item => item.data.name === currency)

			const newCoin = newData?.coins.find(item => item.name === currency)

			if (oldCoin?.data.price === undefined || newCoin?.price === undefined) {
				console.error(
					`Old coin data not found or price is undefined for currency: ${currency}`
				)
				return
			}

			const gain = oldCoin?.data.price - newCoin?.price

			const coinDataString = localStorage.getItem('shortPositions') ?? ''
			let coinDataArray = JSON.parse(coinDataString)

			coinDataArray = coinDataArray.filter(
				(item: ShortPosition) => item.timestamp !== timestamp
			)

			localStorage.setItem('shortPositions', JSON.stringify(coinDataArray))

			const activityEntry = {
				status: 'Closed',
				timestamp: new Date().toLocaleString(),
				coin: coin.data,
				amount: oldCoin?.amount,
				gain: gain,
			}

			const activity = JSON.parse(localStorage.getItem('activity') || '[]')
			activity.push(activityEntry)

			localStorage.setItem('activity', JSON.stringify(activity))
			state.activities.push(activityEntry)

			state.shortPositions = state.shortPositions.filter(
				activity => activity.timestamp !== timestamp
			)
		},
	},
})

export const { shortSellCoin, closeShortTrade } = coinsSlice.actions

export default coinsSlice.reducer
