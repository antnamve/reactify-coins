import Activity from '@/entities/coins/ui/Activity/Activity'
import Assets from '@/entities/coins/ui/Assets/Assets'
import Sidebar from '@/entities/coins/ui/Sidebar/Sidebar'
import './Page.css'

const MainPage = () => {
	return (
		<main className='main'>
			<div className='container'>
				<Assets />
				<Activity />
			</div>
			<Sidebar />
		</main>
	)
}

export default MainPage
