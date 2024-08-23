import { useGetHistoryQuery } from '@/entities/coin/api/coinsApi'
import { format } from 'date-fns'

export function getChartData(uuid: string) {
	const { data: response } = useGetHistoryQuery(uuid)
	const data = response?.data

	if (!data || !data.history) return []

	return data.history
		.filter(item => item.price !== null)
		.map(item => ({
			date: format(new Date(item.timestamp * 1000), 'yyyy-MM-dd HH:mm'),
			price: parseFloat(item.price),
		}))
}
