import { useState } from 'react'
import ShortsForm from '../ShortsForm/ShortsForm'
import './NewAssetCard.css'

function NewAssetCard() {
	const [isToggled, setIsToggled] = useState(false)

	function switchCard() {
		setIsToggled(prev => !prev)
	}

	return (
		<div className='card-new'>
			{!isToggled ? (
				<div className='card-new-center'>
					<div className='card-new-square' onClick={switchCard}>
						<button className='card-new-button'>+</button>
					</div>
					<span className='card-new-description'>Short sell</span>
				</div>
			) : (
				<div>
					<ShortsForm />
					<button onClick={switchCard}>click</button>
				</div>
			)}
		</div>
	)
}

export default NewAssetCard
