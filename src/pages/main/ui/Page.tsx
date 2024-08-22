import Sidebar from '@/widgets/Sidebar/Sidebar'
import Activity from './Activity/Activity'
import Assets from './Assets/ui/Assets'
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
