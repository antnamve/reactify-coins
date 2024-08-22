import {
	useGetCoinsQuery,
	useGetHistoryQuery,
} from '@/entities/coins/api/coinsApi'
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import './Chart.css'
import CustomTooltip from './CustomTooltip/CustomTooltip'

const ChartComponent = ({ currency }: { currency: string }) => {
	const { data: coins } = useGetCoinsQuery()
	const { data: history } = useGetHistoryQuery(
		coins?.data.coins.find(item => item.name === currency)?.uuid || ''
	)

	const hourlyHistory = history?.data.history
		?.filter(item => isOnTheHour(item.timestamp))
		.map(item => ({
			price: item.price,
			timestamp: item.timestamp,
		}))
		.map(entry => ({
			price: parseFloat(entry.price),
			timestamp: new Date(entry.timestamp * 1000).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}),
		}))

	return (
		<div className='card-top-chart'>
			<ResponsiveContainer width='100%' height='100%'>
				<AreaChart data={hourlyHistory}>
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
	)
}

const isOnTheHour = (timestamp: number) => {
	const date = new Date(timestamp * 1000)
	return date.getMinutes() === 0 && date.getSeconds() === 0
}

export default ChartComponent
