import { useAppSelector } from '@/app/appStore'
import { useEffect, useState } from 'react'
import './Assets.css'

function Assets() {
	const [assets, setAssets] = useState<
		{ currency: string; amount: number; symbol: string }[]
	>([])

	const reduxAssets = useAppSelector(state => state.coins.coins)

	useEffect(() => {
		const storedCoins = localStorage.getItem('assets')?.trim()

		if (storedCoins) {
			const parsedCoins = JSON.parse(storedCoins)
			setAssets(parsedCoins)
		} else {
			setAssets([])
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('assets', JSON.stringify(reduxAssets))
		setAssets(reduxAssets)
	}, [reduxAssets])

	return (
		<div>
			<section className='sidebar-info-section'>
				<h2 className='sidebar-title'>Assets</h2>
				{assets.map((asset, index) => (
					<div className='sidebar-section-item' key={index}>
						<div className='sidebar-assets-id'>{asset.currency}</div>
						<div className='sidebar-assets-data'>
							<span className='sidebar-assets-value'>{asset.amount}</span>
							<span className='sidebar-assets-currency'>
								{asset.symbol.toUpperCase()}
							</span>
						</div>
					</div>
				))}
			</section>
			<button className='more-assets-button'>More assets...</button>
		</div>
	)
}

export default Assets
