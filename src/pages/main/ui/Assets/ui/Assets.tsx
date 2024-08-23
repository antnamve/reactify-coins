import { useGetCoinsQuery } from '@/entities/coin/api/coinsApi'
import OpenShortCard from '@/features/trading/ui/OpenShortCard/Card'
import ShortCard from '@/features/trading/ui/ShortCard/ui/Card'
import { useEffect } from 'react'
import './Assets.css'
import { getShortPositions } from '@/entities/activity/helpers/getShortPositions'

function Assets() {
	const shortPositions = getShortPositions()
	const { data: apiResponse, isLoading, refetch } = useGetCoinsQuery()

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 4000)

		return () => clearInterval(intervalId)
	}, [refetch])

	return (
		<section className='assets'>
			<div className='title'>
				<span className='title-start'>ASSETS</span>
				<span className='title-end'>More Assets</span>
			</div>
			<div className='cards-row'>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						{apiResponse &&
							shortPositions.map((item, index) => (
								<ShortCard
									apiResponse={apiResponse}
									key={index}
									shortPosition={item}
									index={index}
								/>
							))}
						<OpenShortCard />
					</>
				)}
			</div>
		</section>
	)
}

export default Assets
