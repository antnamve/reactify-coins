import { Coin } from '@/entities/coins/model/types'

export interface ShortPosition {
	amount: number
	timestamp: string
	data: Coin
}
