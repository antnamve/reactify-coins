import { useGetCoinsQuery } from '@/entities/coins/api/coinsApi'
import CoinsList from '@/entities/coins/ui/CoinsList/CoinsList'
import Account from '@/entities/user/ui/Account/Account'
import Profile from '@/entities/user/ui/TraderProfile/Profile'
import './Sidebar.css'

function Sidebar() {
	const { data } = useGetCoinsQuery()

	return (
		<div className='sidebar'>
			{data && (
				<>
					<Profile />
					<Account apiData={data} />
					<CoinsList apiData={data} />
				</>
			)}
		</div>
	)
}

export default Sidebar
