import { useAppSelector } from '@/app/appStore'
import '@/shared/titles.css'
import { useEffect } from 'react'
import { useGetCoinsQuery } from '../../api/coinsApi'
import Card from '../Card/Card'
import './Assets.css'

function Assets() {
	const shortPositions = useAppSelector(state => state.coins.shortPositions)
	const { data, refetch } = useGetCoinsQuery('')

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

					const getProfit = () =>
						((coin.data?.price - findCoin?.price) * coin.amount).toFixed(2)

					return (
						<Card
							key={index}
							currency={coin.data?.name}
							value={(findCoin?.price * coin.amount).toFixed(2)}
							priceNow={findCoin?.price}
							priceBought={coin.data?.price}
							profit={getProfit()}
							data={coin}
						/>
					)
				})}
				<Card style='new' />
			</div>
		</section>
	)
}

export default Assets
