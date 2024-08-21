import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyGetCoinsQuery } from '../../api/coinsApi'
import { buyCoin, sellCoin } from '../../model/coinsSlice'
import './Form.css'

function Form() {
	const [amount, setAmount] = useState(0)
	const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
	const { data, isLoading } = useLazyGetCoinsQuery('')
	const dispatch = useDispatch()

	useEffect(() => {
		if (data && data.result.length > 0) {
			setSelectedCurrency(data.result[0].id)
		}
	}, [data])

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target.value))
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = data?.result.find(
			currency => currency.name === e.target.value
		)
		setSelectedCurrency(selected?.id || null)
	}

	const handleBuy = () => {
		if (selectedCurrency && amount > 0) {
			const selectedCoin = data?.result.find(
				currency => currency.id === selectedCurrency
			)
			if (selectedCoin) {
				dispatch(
					buyCoin({
						currency: selectedCurrency,
						amount,
						data: data?.result,
					})
				)
			} else {
				console.error('Selected coin not found')
			}
			setAmount(0)
		}
	}

	const handleSell = () => {
		if (selectedCurrency && amount > 0) {
			const selectedCoin = data?.result.find(
				currency => currency.id === selectedCurrency
			)
			if (selectedCoin) {
				dispatch(
					sellCoin({
						currency: selectedCurrency,
						amount,
						data: data?.result,
					})
				)
			} else {
				console.error('Selected coin not found')
			}
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
					data?.result.map(currency => (
						<option key={currency.id} value={currency.name}>
							{currency.name}
						</option>
					))
				)}
			</select>
			<button type='button' onClick={handleBuy}>
				buy
			</button>
			<button type='button' onClick={handleSell}>
				sell
			</button>
		</form>
	)
}

export default Form
