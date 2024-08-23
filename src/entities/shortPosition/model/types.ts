import { Coin } from '@/entities/coin/model/types'

export interface ShortPosition {
	amount: number
	timestamp: string
	data: Coin
}
