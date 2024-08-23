import { Activity } from '@/entities/activity/model/types'
import { ShortPosition } from '@/entities/shortPosition/model/types'

export interface CoinsState {
	shortPositions: ShortPosition[]
	activities: Activity[]
}

export interface GetCoinsResponse {
	status: string
	data: {
		stats: Stats
		coins: Coin[]
	}
}

export interface GetCoinsData {
	stats: Stats
	coins: Coin[]
}

interface Stats {
	total: number
	totalCoins: number
	totalMarkets: number
	totalExchanges: number
	totalMarketCap: string
	total24hVolume: string
}

export interface Coin {
	uuid: string
	symbol: string
	name: string
	color: string
	iconUrl: string
	marketCap: string
	price: string
	listedAt: number
	tier: number
	change: string
	rank: number
	sparkline: string[]
	lowVolume: boolean
	coinrankingUrl: string
	'24hVolume': string
	btcPrice: string
	contractAddresses: string[]
}

export interface GetHistoryResponse {
	status: string
	data: GetHistoryData
}

interface GetHistoryData {
	change: string
	history: History[]
}
interface History {
	price: string
	timestamp: number
}
