export interface Coins {
	uuid: string
	symbol: string
	name: string
	color: string
	iconUrl: string
	marketCap: string // Assuming marketCap is a string representation of a number
	price: string // Assuming price is a string representation of a number
	listedAt: number
	tier: number
	change: string // Assuming change is a string representation of a number
	rank: number
	sparkline: number[]
	lowVolume: boolean
	coinrankingUrl: string
	'24hVolume': string // Assuming 24hVolume is a string representation of a number
	btcPrice: string // Assuming btcPrice is a string representation of a number
	contractAddresses?: string[] // Optional property for contract addresses (array of strings)
}

export interface CoinData {
	coins: Coins[]
	stats: any
}

export interface CoinsResponse {
	data: CoinData
	status: string
}
