import { CoinsResponse } from '@/shared/interfaces'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface Coin {
	currency: string
	amount: number
	symbol: string
	price: number
}

interface ShortPosition {
	amount: number
	timestamp: string
	data: {
		uuid: string
		symbol: string
		name: string
		color: string
		iconUrl: string
		marketCap: string
		price: number
		listedAt: number
		tier: number
		change: string
		rank: number
		sparkline: number[]
		lowVolume: boolean
		coinrankingUrl: string
		'24hVolume': string
		btcPrice: string
		contractAddresses?: string[]
	}
}

interface CoinsState {
	coins: Coin[]
	shortPositions: ShortPosition[]
	activities: []
}

const loadInitialState = (): Coin[] => {
	const storedCoins = localStorage.getItem('assets')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const loadInitialShorts = (): ShortPosition[] => {
	const storedCoins = localStorage.getItem('shortPositions')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const loadInitialActivities = (): [] => {
	const storedCoins = localStorage.getItem('activity')
	return storedCoins ? JSON.parse(storedCoins) : []
}

const initialState: CoinsState = {
	coins: loadInitialState(),
	shortPositions: loadInitialShorts(),
	activities: loadInitialActivities(),
}

export const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		buyCoin: (
			state,
			action: PayloadAction<{
				currency: string
				amount: number
				symbol: string
				data: CoinsResponse
			}>
		) => {
			const { currency, amount, data } = action.payload
			const existingCoin = state.coins.find(item => item.currency === currency)
			const currentCoin = data?.find(item => item.id === currency)

			const price = amount * currentCoin?.price

			if (existingCoin) {
				existingCoin.amount += amount
			} else {
				state.coins.push({ currency, amount, price })
			}

			const activityEntry = {
				currency,
				amount,
				price,
				status: 'purchased',
				timestamp: new Date().toLocaleString(),
			}

			const activity = JSON.parse(localStorage.getItem('activity') || '[]')
			activity.push(activityEntry)

			localStorage.setItem('assets', JSON.stringify(state.coins))
			localStorage.setItem('activity', JSON.stringify(activity))
		},

		sellCoin: (
			state,
			action: PayloadAction<{
				currency: string
				amount: number
				symbol: string
				data: any
			}>
		) => {
			const { currency, amount, data } = action.payload
			const existingCoin = state.coins.find(item => item.currency === currency)
			const currentCoin = data?.find(item => item.id === currency)

			const price = amount * currentCoin?.price

			if (existingCoin) {
				existingCoin.amount -= amount
			} else {
				state.coins.push({ currency, amount, price })
			}

			const activityEntry = {
				currency,
				data: '',
				amount,
				price,
				status: 'Sold',
				timestamp: new Date().toLocaleString(),
				gain: '-',
			}

			const activity = JSON.parse(localStorage.getItem('activity') || '[]')
			activity.push(activityEntry)

			localStorage.setItem('assets', JSON.stringify(state.coins))
			localStorage.setItem('activity', JSON.stringify(activity))
		},

		shortSellCoin: (
			state,
			action: PayloadAction<{
				amount: number
				data: any
			}>
		) => {
			const { amount, data } = action.payload

			state.shortPositions.push(action.payload)

			const activityEntry = {
				coin: data,
				amount,
				status: 'Opened',
				timestamp: new Date().toLocaleString(),
				gain: '-',
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
				coin: {}
				oldData: {}
				newData: {}
				currency: string
			}>
		) => {
			const { timestamp, coin, oldData, newData, currency } = action.payload

			const oldCoin = oldData?.find(item => item.data.name === currency)
			const newCoin = newData.coins.find(item => item.name === currency)
			console.log('sliceodl', oldCoin)
			console.log('slicnew', newCoin)

			const gain = oldCoin.data.price - newCoin.price

			const coinDataString = localStorage.getItem('shortPositions')
			let coinDataArray = JSON.parse(coinDataString)

			coinDataArray = coinDataArray.filter(item => item.timestamp !== timestamp)

			localStorage.setItem('shortPositions', JSON.stringify(coinDataArray))

			console.log('oldocoo', oldCoin)

			const activityEntry = {
				status: 'Closed',
				timestamp: new Date().toLocaleString(),
				coin: coin.data,
				amount: oldCoin.amount,
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

export const { buyCoin, sellCoin, shortSellCoin, closeShortTrade } =
	coinsSlice.actions

export default coinsSlice.reducer
