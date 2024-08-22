import { useAppSelector } from '@/app/appStore'
import { ApiResponse } from '@/shared/interfaces'
import './Account.css'

function Account({ apiData }: { apiData: ApiResponse }) {
	const shortPositions = useAppSelector(state => state.coins.shortPositions)

	console.log('chethis', apiData)

	function calculateTotalValue() {
		const prices = apiData.data.coins.reduce(
			(acc: { [key: string]: number }, coin) => {
				acc[coin.uuid] = parseFloat(coin.price)
				return acc
			},
			{}
		)

		const totalValue = shortPositions.reduce((total, position) => {
			const { amount, data } = position
			const price = prices[data.uuid]
			if (price) {
				return total + amount * price
			}
			return total
		}, 0)

		return Math.round(totalValue)
	}

	console.log(calculateTotalValue())

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
						${calculateTotalValue()}
					</span>
				</li>
			</ul>
		</div>
	)
}

export default Account
