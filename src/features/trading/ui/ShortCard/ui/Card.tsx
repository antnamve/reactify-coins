import { getShortPositions } from '@/entities/activity/helpers/getShortPositions'
import { useGetCoinsQuery } from '@/entities/coin/api/coinsApi'
import { closeShortTrade } from '@/entities/coin/model/coinsSlice'
import { GetCoinsResponse } from '@/entities/coin/model/types'
import Chart from '@/entities/coin/ui/Chart/ui/Chart'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShortPosition } from '../../../../../entities/shortPosition/model/types'
import './Card.css'

interface CardProps {
	shortPosition: ShortPosition
	apiResponse: GetCoinsResponse
	index: number
}

function Card({ shortPosition, apiResponse, index }: CardProps) {
	const shortPositions = getShortPositions()
	const currentCoin = apiResponse.data.coins.find(
		item => item.name === shortPosition.data.name
	)
	const value = shortPosition.amount * Number(currentCoin!.price)
	const profit = Number(shortPosition.data.price) - Number(currentCoin!.price)
	const [shouldBlink, setShouldBlink] = useState(false)
	const dispatch = useDispatch()
	const { data } = useGetCoinsQuery()

	useEffect(() => {
		setShouldBlink(true)
		const timer = setTimeout(() => setShouldBlink(false), 1000)

		return () => clearTimeout(timer)
	}, [apiResponse])

	function handlePositionClosure() {
		if (shortPosition) {
			dispatch(
				closeShortTrade({
					timestamp: shortPosition.timestamp,
					coin: shortPosition,
					oldCoins: shortPositions,
					newCoins: data?.data,
					currency: shortPosition.data.name,
				})
			)
		}
	}

	return (
		<div className='card-entry'>
			<div className='card-header'>
				<span className='card-entry-data'>{shortPosition.data.name}</span>
				<button onClick={handlePositionClosure}>Close this position</button>
			</div>
			{currentCoin && (
				<div
					className={`${index % 2 === 0 ? 'card-filled' : 'card-blank'} ${
						shouldBlink ? 'blink' : ''
					}`}
				>
					<div className='card-top'>
						<div className='card-top-data'>
							<span className='card-top-currency'>$</span>
							<span className='card-top-value'>{value.toFixed(2)}</span>
						</div>
						<Chart uuid={currentCoin.uuid} />
					</div>
					<div className='card-bottom'>
						<div className='card-bottom-item'>
							<span>current price: ${currentCoin.price}</span>
						</div>
						<div className='card-bottom-item'>
							<span>bought for: ${shortPosition.data.price}</span>
						</div>
						<div className='card-bottom-item'>
							<span>profit: ${profit.toFixed(2)}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Card
