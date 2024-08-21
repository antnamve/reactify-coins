import { useEffect, useMemo, useState } from 'react'
import { useLazyGetCoinsQuery } from '../api/coinsApi'

const { data, isLoading } = useLazyGetCoinsQuery('')

const [assets, setAssets] = useState<
	{ currency: string; amount: number; symbol: string }[]
>([])

useEffect(() => {
	const storedAssets = localStorage.getItem('assets')

	if (storedAssets) {
		const parsedAssets = JSON.parse(storedAssets)
		setAssets(parsedAssets)
	}
}, [])

export const assetsWithValues = useMemo(() => {
	if (!data || isLoading) return []

	return assets.map(asset => {
		const coinData = data.result.find(
			(coin: { symbol: string }) => coin.symbol === asset.symbol
		)

		if (coinData) {
			const valueInUsd = asset.amount * coinData.price
			return { ...asset, valueInUsd }
		}

		return { ...asset, valueInUsd: 0 }
	})
}, [assets, data, isLoading])
