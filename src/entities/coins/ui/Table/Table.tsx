import { useAppSelector } from '@/app/appStore'
import { useEffect } from 'react'
import './Table.css'

function Table() {
	const activities = useAppSelector(state => state.coins.activities)

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
					{reversed?.map((entry, index) => (
						<tr key={index}>
							<td className='transaction-item'>
								<img
									src={entry.coin.iconUrl}
									alt='Coin operation'
									className='transaction-icon'
								/>
								{entry.coin.name}
							</td>
							<td>{`${entry.amount} ${entry.coin.symbol}`}</td>
							<td>${(entry.amount * entry.coin.price).toFixed(2)}</td>
							<td>{entry.gain}</td>
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
