import { Coin } from '@/entities/coin/model/types'

export interface Activity {
	coin: Coin
	amount: number
	status: 'Opened' | 'Closed'
	timestamp: string
	gain: number | null
}
