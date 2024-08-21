import './Profile.css'

function Profile() {
	return (
		<div className='trading-bar'>
			<h1 className='sidebar-main-title'>Trader Profile</h1>
			<div className='pfp'></div>
			<span className='sidebar-main-title'>Han Ji Pyeong</span>
			<button className='edit-profile-button'>Edit Profile</button>
			<div className='sidebar-details'>
				<section className='sidebar-info-section'>
					<h2 className='sidebar-title'>Account</h2>
					<div className='sidebar-section-item'>
						<span className='joined'>Joined</span>
						<span className='date'>2020</span>
					</div>
				</section>
				<section className='sidebar-info-section'>
					<h2 className='sidebar-title'>Assets</h2>
					<div className='sidebar-section-item'>
						<div className='sidebar-assets-id'>Bitcoin</div>
						<div className='sidebar-assets-data'>
							<span className='sidebar-assets-value'>22.5</span>
							<span className='sidebar-assets-currency'>BTC</span>
						</div>
					</div>
					<div className='sidebar-section-item'>
						<div className='sidebar-assets-id'>Bitcoin</div>
						<div className='sidebar-assets-data'>
							<span className='sidebar-assets-value'>22.5</span>
							<span className='sidebar-assets-currency'>BTC</span>
						</div>
					</div>
					<div className='sidebar-section-item'>
						<div className='sidebar-assets-id'>Bitcoin</div>
						<div className='sidebar-assets-data'>
							<span className='sidebar-assets-value'>22.5</span>
							<span className='sidebar-assets-currency'>BTC</span>
						</div>
					</div>
					<div className='sidebar-section-item'>
						<div className='sidebar-assets-id'>Bitcoin</div>
						<div className='sidebar-assets-data'>
							<span className='sidebar-assets-value'>22.5</span>
							<span className='sidebar-assets-currency'>BTC</span>
						</div>
					</div>
				</section>
				<button className='more-assets-button'>More assets...</button>
			</div>
			<button className='trade-now'>
				<div className='trade-now-button-content'>
					<svg
						className='trade-now-svg'
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M14.033 16.8035V5.45535'
							stroke='white'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M17.431 13.3901L14.0329 16.804L10.6347 13.3901'
							stroke='white'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M5.75927 3.19406V14.5422'
							stroke='white'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M2.36121 6.60749L5.75935 3.1936L9.1575 6.60749'
							stroke='white'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<span className='sidebar-button-text'>Trade Now</span>
				</div>
			</button>
		</div>
	)
}

export default Profile
