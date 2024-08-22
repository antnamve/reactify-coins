import { useAppSelector } from '@/app/appStore'
import { formatNumber } from '@/shared/helpers/formatNumber'
import '@/shared/titles.css'
import { useEffect } from 'react'
import { useGetCoinsQuery } from '../../api/coinsApi'
import Card from '../Card/Card'
import './Assets.css'

function Assets() {
	const shortPositions = useAppSelector(state => state.coins.shortPositions)
	const { data, refetch } = useGetCoinsQuery()

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 4000)

		return () => clearInterval(intervalId)
	}, [refetch])

	useEffect(() => {}, [shortPositions])

	return (
		<section className='assets'>
			<div className='title'>
				<span className='title-start'>ASSETS</span>
				<span className='title-end'>More Assets</span>
			</div>
			<div className='cards-row'>
				{shortPositions?.map((coin, index) => {
					const findCoin = data?.data.coins.find(
						item => item.name === coin.data?.name
					)

					const getProfit = () => {
						if (findCoin?.price && coin.data?.price) {
							return formatNumber(
								(Number(coin.data.price) - Number(findCoin.price)) * coin.amount
							)
						}
						return '0.00'
					}
					return (
						data && (
							<Card
								key={index}
								currency={coin.data.name}
								value={
									findCoin?.price !== undefined
										? (parseFloat(findCoin.price) * coin.amount).toFixed(2)
										: '0.00'
								}
								priceNow={parseFloat(findCoin?.price ?? '0')}
								priceBought={parseFloat(coin.data.price.toString() ?? '0')}
								profit={getProfit()}
								data={coin}
							/>
						)
					)
				})}
				<Card style='new' />
			</div>
		</section>
	)
}

export default Assets
