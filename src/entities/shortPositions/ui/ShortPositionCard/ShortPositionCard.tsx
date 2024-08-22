import { ClosePositionButton } from '@/features/closeShortPosition/ui/ClosePositionButton'
import OpenShortPositionCard from '@/features/openShortPosition/ui/Card/Card'
import Chart from '@/widgets/Chart/ui/Chart'
import { useEffect, useState } from 'react'
import { ShortPosition } from '../../model/types'
import './ShortPositionCard.css'

interface CardProps {
	style?: 'filled' | 'blank' | 'new'
	currency: string
	value?: string
	profit?: string
	priceNow?: string | number
	priceBought?: number
	shortPosition: ShortPosition
}

function ShortPositionCard({
	style = 'filled',
	currency,
	value,
	profit,
	priceNow,
	priceBought,
	shortPosition,
}: CardProps) {
	const [shouldBlink, setShouldBlink] = useState(false)

	useEffect(() => {
		setShouldBlink(true)

		const timeoutId = setTimeout(() => {
			setShouldBlink(false)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [value])

	return (
		<div className='card-entry'>
			<div className='card-header'>
				<span className='card-entry-data'>{currency}</span>
				{style !== 'new' && (
					<ClosePositionButton
						shortPosition={shortPosition}
						currency={currency}
					/>
				)}
			</div>
			{style === 'new' ? (
				<OpenShortPositionCard />
			) : (
				<div
					className={
						style === 'filled'
							? `card-filled ${shouldBlink ? 'blink' : ''}`
							: 'card-blank'
					}
				>
					<div className='card-top'>
						<div className='card-top-data'>
							<span className='card-top-currency'>$</span>
							<span className='card-top-value'>{value}</span>
						</div>
						<Chart currency={currency ?? ''} />
					</div>
					<div className='card-bottom'>
						<div className='card-bottom-item'>
							<span>current Price {priceNow}</span>
						</div>
						<div className='card-bottom-item'>
							<span>price Bought {priceBought}</span>
						</div>
						<div className='card-bottom-item'>
							<span>profit {profit}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ShortPositionCard
