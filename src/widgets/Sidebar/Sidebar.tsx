import { useGetCoinsQuery } from '@/entities/coin/api/coinsApi'
import CoinsList from '@/entities/coin/ui/CoinsList/CoinsList'
import Profile from '@/entities/user/ui/Profile/Profile'
import Stats from '@/entities/user/ui/Stats/Stats'
import './Sidebar.css'

function Sidebar() {
	const { data } = useGetCoinsQuery()

	return (
		<div className='sidebar'>
			<Profile />
			<Stats />
			{data && <CoinsList apiData={data} />}
		</div>
	)
}

export default Sidebar
