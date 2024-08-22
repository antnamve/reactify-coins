import { useState } from 'react'
import './SidebarAssets.css'

function SidebarAssets({ apiData }) {
	const { coins } = apiData.data

	const [visibleItems, setVisibleItems] = useState(5)

	const loadMoreItems = () => {
		setVisibleItems(prevVisibleItems => prevVisibleItems + 5)
	}

	return (
		<div className='sidebar-assets'>
			<h1 className='sidebar-title'>Coins</h1>
			<ul>
				{coins.slice(0, visibleItems).map(coin => (
					<li key={coin.uuid} className='sidebar-list-item'>
						<span className='sidebar-list-item-title'>{coin.name}</span>
						<span className='sidebar-list-item-value'>
							${parseFloat(coin.price).toFixed(2)}{' '}
							<span className='sidebar-coin-uuid'>{coin.symbol}</span>
						</span>
					</li>
				))}
			</ul>
			<button onClick={loadMoreItems} className='sidebar-more-assets-button'>
				More coins...
			</button>
		</div>
	)
}

export default SidebarAssets
