import './Button.css'

function Button() {
	return (
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
	)
}

export default Button
