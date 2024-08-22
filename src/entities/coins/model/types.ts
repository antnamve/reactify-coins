export interface GetCoinsResponse {
	status: string
	data: GetCoinsData
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
	sparkline: (string | null)[]
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
