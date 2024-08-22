export interface ApiResponse {
	status: string
	data: Data
}

export interface Data {
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

interface Coin {
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
	sparkline: (string | null)[]
	lowVolume: boolean
	coinrankingUrl: string
	'24hVolume': string
	btcPrice: string
	contractAddresses: string[]
}

export interface CoinTransaction {
	amount: number
	timestamp: string
	data: Coin[]
}

export interface CoinData {
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
	sparkline: (string | null)[]
	lowVolume: boolean
	coinrankingUrl: string
	'24hVolume': string
	btcPrice: string
	contractAddresses: string[]
}

interface GetHistoryEntry {
	price: string
	timestamp: number
}

interface GetHistoryData {
	change: string
	history: GetHistoryEntry[]
}

export interface GetHistoryResponse {
	status: string
	data: GetHistoryData
}

export interface Special {
	amount: number
	timestamp: string
	data: Coin
}

export interface ShortPosition {
	amount: number
	timestamp?: string
	data: CoinData
}

export interface Activities {
	coin: Coin
	amount: number
	status: 'Opened' | 'Closed'
	timestamp: string
	gain: number | null
}
