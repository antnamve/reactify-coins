import { useAppSelector } from '@/app/appStore'
import { useState } from 'react'
import Table from '../Table/Table'
import './Activity.css'

function Activity() {
	const [entriesCount, setEntriesCount] = useState(5)
	const activities = useAppSelector(state => state.coins.activities)

	console.log(activities)

	const loadMore = () => {
		setEntriesCount(prevCount => prevCount + 5)
	}

	return (
		<>
			<div className='title'>
				<span className='title-start'>ACTIVITY</span>
				{activities.length ? (
					<button onClick={loadMore} className='title-end'>
						More Activity
					</button>
				) : (
					''
				)}
			</div>
			{activities.length ? (
				<Table entriesCount={entriesCount} activities={activities} />
			) : (
				<span>There's no activities yet</span>
			)}
		</>
	)
}

export default Activity
