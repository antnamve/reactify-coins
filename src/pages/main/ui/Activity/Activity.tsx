import { getActivities } from '@/entities/activity/helpers/getActivities'
import Table from '@/features/trading/ui/Table/Table'
import { useState } from 'react'
import './Activity.css'

function Activity() {
	const activities = getActivities()
	const [entriesCount, setEntriesCount] = useState(5)

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
