import { useGetCoinsQuery } from '../../api/coinsApi'
import Account from '../Account/Account'
import Profile from '../Profile/Profile'
import SidebarAssets from '../SidebarAssets/SidebarAssets'
import './Sidebar.css'

function Sidebar() {
	const { data } = useGetCoinsQuery()

	return (
		<div className='sidebar'>
			{data && (
				<>
					<Profile />
					<Account apiData={data} />
					<SidebarAssets apiData={data} />
				</>
			)}
		</div>
	)
}

export default Sidebar
