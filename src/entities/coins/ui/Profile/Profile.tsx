import './Profile.css'

function Profile() {
	return (
		<section className='trader-profile-section'>
			<h1 className='trader-profile-section-title'>Trader Profile</h1>
			<img
				src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				alt='Trader avatar'
				className='trader-profile-picture'
			/>
			<span className='trader-name'>Han Ji Pyeong</span>
			<button className='edit-profile-button'>Edit Profile</button>
		</section>
	)
}

export default Profile
