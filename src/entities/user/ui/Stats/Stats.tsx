import { getShortPositions } from '@/entities/activity/helpers/getShortPositions'
import { useGetCoinsQuery } from '@/entities/coin/api/coinsApi'
import './Stats.css'
import { calculateTotalValue } from './helpers/calculateTotalValue'

function Stats() {
	const { data } = useGetCoinsQuery()

	const shortPositions = getShortPositions()

	return (
		<div className='account'>
			<h1 className='sidebar-title'>Account</h1>
			<ul>
				<li className='sidebar-list-item'>
					<span className='sidebar-list-item-title'>Joined</span>
					<span className='sidebar-list-item-right'>June 22, 2020</span>
				</li>
				<li className='sidebar-list-item'>
					<span className='sidebar-list-item-title'>Assets Total</span>
					<span className='sidebar-list-item-right'>
						${data && calculateTotalValue(data, shortPositions)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export default Stats
