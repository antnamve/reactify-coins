import { useEffect, useState } from 'react'
import { useLazyGetCoinsQuery } from '../../api/coinsApi'
import './Trading.css'

function Trading() {
	const { data, isLoading } = useLazyGetCoinsQuery('')
	const [portfolio, setPortfolio] = useState([])
	const [shortPositions, setShortPositions] = useState([])
	const [transactionAmount, setTransactionAmount] = useState(0)
	const [selectedCoin, setSelectedCoin] = useState('')

	useEffect(() => {
		// Initialize portfolio from local storage or set empty if not available
		const storedPortfolio = localStorage.getItem('portfolio')
		const storedShorts = localStorage.getItem('shortPositions')
		if (storedPortfolio) {
			setPortfolio(JSON.parse(storedPortfolio))
		}
		if (storedShorts) {
			setShortPositions(JSON.parse(storedShorts))
		}
	}, [])

	useEffect(() => {
		// Save portfolio and short positions to local storage on change
		localStorage.setItem('portfolio', JSON.stringify(portfolio))
		localStorage.setItem('shortPositions', JSON.stringify(shortPositions))
	}, [portfolio, shortPositions])

	const handleTransaction = type => {
		if (!selectedCoin || transactionAmount <= 0 || isLoading || !data) return

		const coinData = data.result.find(coin => coin.symbol === selectedCoin)
		if (!coinData) return

		const currentPrice = coinData.price
		const transaction = {
			currency: selectedCoin,
			amount: transactionAmount,
			price: currentPrice,
			type,
		}

		let newPortfolio = [...portfolio]
		let newShortPositions = [...shortPositions]

		switch (type) {
			case 'buy':
				newPortfolio.push(transaction)
				break

			case 'sell':
				const sellIndex = newPortfolio.findIndex(
					item =>
						item.currency === selectedCoin && item.amount >= transactionAmount
				)
				if (sellIndex !== -1) {
					newPortfolio[sellIndex].amount -= transactionAmount
					if (newPortfolio[sellIndex].amount === 0)
						newPortfolio.splice(sellIndex, 1)
				}
				break

			case 'shortsell':
				newShortPositions.push(transaction)
				break

			case 'shortbuy':
				const shortIndex = newShortPositions.findIndex(
					item =>
						item.currency === selectedCoin && item.amount >= transactionAmount
				)
				if (shortIndex !== -1) {
					newShortPositions[shortIndex].amount -= transactionAmount
					if (newShortPositions[shortIndex].amount === 0)
						newShortPositions.splice(shortIndex, 1)
				}
				break

			default:
				break
		}

		setPortfolio(newPortfolio)
		setShortPositions(newShortPositions)
	}

	return (
		<div className='trading-container'>
			<h1>Trade Coins</h1>
			<div className='trading-form'>
				<select
					onChange={e => setSelectedCoin(e.target.value)}
					value={selectedCoin}
				>
					<option value=''>Select Coin</option>
					{data &&
						data.result.map(coin => (
							<option key={coin.symbol} value={coin.symbol}>
								{coin.symbol.toUpperCase()}
							</option>
						))}
				</select>
				<input
					type='number'
					value={transactionAmount}
					onChange={e => setTransactionAmount(Number(e.target.value))}
					placeholder='Amount'
				/>
				<div className='trading-buttons'>
					<button onClick={() => handleTransaction('buy')}>Buy</button>
					<button onClick={() => handleTransaction('sell')}>Sell</button>
					<button onClick={() => handleTransaction('shortsell')}>
						Short Sell
					</button>
					<button onClick={() => handleTransaction('shortbuy')}>
						Short Buy
					</button>
				</div>
			</div>

			<div className='portfolio'>
				<h2>Portfolio</h2>
				{portfolio.map((item, index) => (
					<div key={index}>
						{item.amount} {item.currency.toUpperCase()} @ $
						{item.price.toFixed(2)}
					</div>
				))}
			</div>

			<div className='short-positions'>
				<h2>Short Positions</h2>
				{shortPositions.map((item, index) => (
					<div key={index}>
						{item.amount} {item.currency.toUpperCase()} @ $
						{item.price.toFixed(2)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Trading
