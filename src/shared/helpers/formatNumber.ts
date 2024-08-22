export function formatNumber(num: number | null) {
	if (num === null) {
		return '-'
	}

	if (num === 0) {
		return '0'
	}

	const precision = Math.abs(num) < 0.01 ? 4 : 2

	const roundedNum = Number(num.toFixed(precision))

	return roundedNum.toString()
}
