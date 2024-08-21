import React from 'react'
import { TooltipProps } from 'recharts'

const CustomTooltip: React.FC<TooltipProps<string, number>> = ({
	active,
	payload,
	label,
}) => {
	if (active && payload && payload.length) {
		return (
			<div style={styles.tooltip}>
				<p style={styles.label}>{`${label}`}</p>
				<p style={styles.value}>{`Price: $${payload[0].value}`}</p>
			</div>
		)
	}

	return null
}

const styles = {
	tooltip: {
		backgroundColor: '#fff',
		padding: '5px',
		border: '1px solid #ccc',
		borderRadius: '3px',
		fontSize: '10px',
		lineHeight: '1.2',
	},
	label: {
		margin: 0,
		color: '#666',
	},
	value: {
		margin: 0,
		color: '#000',
	},
}

export default CustomTooltip
