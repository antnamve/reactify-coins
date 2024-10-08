import { useGetCoinsQuery } from '@/entities/coin/api/coinsApi'
import { openShortTrade } from '@/entities/coin/model/coinsSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './Form.css'

function Form() {
	const [amount, setAmount] = useState(0)
	const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
	const { data, isLoading } = useGetCoinsQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		if (data && data.data.coins.length > 0) {
			setSelectedCurrency(data.data.coins[0].name)
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

	const filteredData = data?.data.coins.find(
		item => item.name === selectedCurrency
	)

	const handleShortSell = () => {
		if (filteredData) {
			dispatch(
				openShortTrade({
					amount,
					timestamp: new Date().toISOString(),
					data: filteredData,
				})
			)

			setAmount(0)
		}
	}

	return (
		<form className='form'>
			<input type='number' value={amount} onChange={handleAmountChange} />
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

export default Form
