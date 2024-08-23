import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { getChartData } from '../helpers/getChartData'
import './Chart.css'
import CustomTooltip from './CustomTooltip/CustomTooltip'

const Chart = ({ uuid }: { uuid: string }) => {
	const data = getChartData(uuid)

	return (
		<div className='card-top-chart'>
			<ResponsiveContainer width='100%' height='100%'>
				<AreaChart data={data}>
					<XAxis dataKey='date' hide />
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

export default Chart
