import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetCoinsQuery } from '../../api/coinsApi'
import { shortSellCoin } from '../../model/coinsSlice'
import './Form.css'

function ShortsForm() {
	const [amount, setAmount] = useState(0)
	const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
	const { data, isLoading } = useGetCoinsQuery(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (data && data.data.coins.length > 0) {
			setSelectedCurrency(data.data.coins[0].id)
		}
	}, [data])

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target.value))
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = data?.data.coins.find(
			currency => currency.name === e.target.value
		)

		setSelectedCurrency(selected?.name || null)
	}

	const data2 = data?.data.coins.find(item => item.name === selectedCurrency)

	const handleShortSell = () => {
		if (data2) {
			dispatch(
				shortSellCoin({
					amount,
					timestamp: new Date().toISOString(),
					data: data2,
				})
			)

			setAmount(0)
		}
	}

	return (
		<form className='form'>
			<input type='text' value={amount} onChange={handleAmountChange} />
			<input type='text' disabled />
			<select name='' id='' className='select' onChange={handleSelectChange}>
				{isLoading ? (
					<option>Loading...</option>
				) : (
					data?.data.coins.map(currency => (
						<option key={currency.name} value={currency.name}>
							{currency.name}
						</option>
					))
				)}
			</select>
			<button type='button' onClick={handleShortSell}>
				short sell
			</button>
		</form>
	)
}

export default ShortsForm
