import { useAppSelector } from '@/app/appStore'
import { useGetCoinsQuery } from '@/entities/coins/api/coinsApi'
import { closeShortTrade } from '@/entities/coins/model/coinsSlice'
import { ShortPosition } from '@/entities/shortPositions/model/types'
import { useDispatch } from 'react-redux'
import './ClosePositionButton.css'

export const ClosePositionButton = ({
	shortPosition,
	currency,
}: {
	shortPosition: ShortPosition
	currency: string
}) => {
	const dispatch = useDispatch()
	const { data } = useGetCoinsQuery()
	const stateData = useAppSelector(state => state.coins.shortPositions)

	function handleCloseTrade() {
		if (shortPosition) {
			dispatch(
				closeShortTrade({
					timestamp: shortPosition.timestamp ?? '',
					coin: shortPosition,
					oldCoins: stateData,
					newCoins: data?.data,
					currency: currency ?? '',
				})
			)
		}
	}

	return <button onClick={handleCloseTrade}>Close this trade</button>
}
