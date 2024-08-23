import { formatNumber } from '@/features/trading/ui/Table/helpers/formatNumber'
import { useEffect } from 'react'
import { Activity } from '../../../../entities/activity/model/types'
import './Table.css'

interface TableProps {
	entriesCount: number
	activities: Activity[]
}

function Table({ entriesCount, activities }: TableProps) {
	const reversed = [...activities].reverse()

	useEffect(() => {}, [activities])

	return (
		<div className='transaction-table-container'>
			<table className='transaction-table'>
				<thead className='transactions-table-header'>
					<tr>
						<th>Currency</th>
						<th>Amount</th>
						<th>Total</th>
						<th>Gain</th>
						<th>Trade Status</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{reversed?.slice(0, entriesCount).map((entry, index) => (
						<tr key={index}>
							<td className='transaction-item'>
								<img
									src={entry.coin?.iconUrl}
									alt='Coin operation'
									className='transaction-icon'
								/>
								{entry.coin?.name}
							</td>
							<td>{`${entry.amount} ${entry.coin?.symbol}`}</td>
							<td>${(entry.amount * Number(entry.coin.price)).toFixed(2)}</td>
							<td>{formatNumber(entry.gain)}</td>
							<td>{entry.status}</td>
							<td>{entry.timestamp}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
