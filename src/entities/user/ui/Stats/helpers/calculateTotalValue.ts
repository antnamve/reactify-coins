import { GetCoinsResponse } from '@/entities/coin/model/types'
import { ShortPosition } from '@/entities/shortPosition/model/types'

export function calculateTotalValue(
	apiResponse: GetCoinsResponse,
	shortPositions: ShortPosition[]
) {
	const prices = apiResponse.data.coins.reduce(
		(acc: { [key: string]: number }, coin) => {
			acc[coin.uuid] = parseFloat(coin.price)
			return acc
		},
		{}
	)

	const totalValue = shortPositions.reduce((total, position) => {
		const { amount, data } = position
		const price = prices[data.uuid]
		if (price) {
			return total + amount * price
		}
		return total
	}, 0)

	return Math.round(totalValue)
}
