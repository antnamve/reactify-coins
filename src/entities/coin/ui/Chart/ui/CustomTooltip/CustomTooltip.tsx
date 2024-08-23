import React from 'react'
import { TooltipProps } from 'recharts'

const CustomTooltip: React.FC<TooltipProps<string, number>> = ({
	active,
	payload,
	label,
}) => {
	if (active && payload && payload.length) {
		return (
			<div className='tooltip'>
				<p className='label'>{`${label}`}</p>
				<p className='value'>{`Price: $${payload[0].value}`}</p>
			</div>
		)
	}

	return null
}

export default CustomTooltip
