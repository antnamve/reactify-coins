import { useAppSelector } from '@/app/appStore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useGetCoinsQuery, useGetHistoryQuery } from '../../api/coinsApi'
import { closeShortTrade } from '../../model/coinsSlice'
import CustomTooltip from '../CustomTooltip/CustomTooltip'
import NewAssetCard from '../NewAssetCard/NewAssetCard'
import './Card.css'

interface CardProps {
	style?: 'filled' | 'blank' | 'new'
	currency?: string
	value?: number
	profit?: number
	loss?: number
	neutral?: number
	data?: []
}

function Card({
	style = 'filled',
	currency,
	value,
	profit,
	priceNow = 100,
	priceBought,
	data,
}: CardProps) {
	const [shouldBlink, setShouldBlink] = useState(false)
	const [isValueIncreased, setIsValueIncreased] = useState(false)
	const [previousValue, setPreviousValue] = useState<number | null>(null)
	const { data: assets, refetch } = useGetCoinsQuery('')
	const dispatch = useDispatch()
	const oldData = useAppSelector(state => state.coins.shortPositions)

	console.log('api', assets)
	console.log('state', oldData)

	const coin = assets?.data.coins.find(item => item.name === currency)

	const { data: history } = useGetHistoryQuery(coin?.uuid)

	const dataPrepared = history?.data.history

	function isOnTheHour(timestamp) {
		const date = new Date(timestamp * 1000)
		return date.getMinutes() === 0 && date.getSeconds() === 0
	}
	const hourlyData = dataPrepared
		?.filter(item => isOnTheHour(item.timestamp))
		.map(item => ({
			price: item.price,
			timestamp: item.timestamp,
		}))

	useEffect(() => {
		setShouldBlink(true)

		const timeoutId = setTimeout(() => {
			setShouldBlink(false)
		}, 1000)

		if (previousValue !== null) {
			setIsValueIncreased(value > previousValue)
		}

		setPreviousValue(value)

		return () => clearTimeout(timeoutId)
	}, [value, previousValue])

	const formattedData = hourlyData?.map(entry => ({
		price: parseFloat(entry.price),
		timestamp: new Date(entry.timestamp * 1000).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		}),
	}))

	function handleCloseTrade() {
		if (data) {
			dispatch(
				closeShortTrade({
					timestamp: data.timestamp,
					coin: data,
					oldData: oldData,
					newData: assets.data,
					currency,
				})
			)
		}
	}

	return (
		<div className='card-entry'>
			<div className='card-header'>
				<span className='card-entry-data'>{currency}</span>
				{style !== 'new' && (
					<button onClick={handleCloseTrade}>Close this trade</button>
				)}
			</div>
			{style === 'new' ? (
				<NewAssetCard />
			) : (
				<div
					className={
						style === 'filled'
							? `card-filled ${shouldBlink ? 'blink' : ''} ${
									isValueIncreased ? 'value-increased' : 'value-decreased'
							  }`
							: 'card-blank'
					}
				>
					<div className='card-top'>
						<div className='card-top-data'>
							<span className='card-top-currency'>$</span>
							<span className='card-top-value'>{value}</span>
						</div>
						<div className='card-top-chart'>
							<ResponsiveContainer width='100%' height='100%'>
								<AreaChart data={formattedData}>
									<XAxis dataKey='timestamp' hide />
									<YAxis domain={['dataMin', 'dataMax']} hide />
									<Tooltip content={<CustomTooltip />} />
									<Area
										type='monotone'
										dataKey='price'
										stroke='#f46565'
										fill='#f46565'
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className='card-bottom'>
						<div className='card-bottom-item'>
							<span>current Price {priceNow}</span>
						</div>
						<div className='card-bottom-item'>
							<span>price Bought {priceBought}</span>
						</div>
						<div className='card-bottom-item'>
							<span>profit {profit}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Card
