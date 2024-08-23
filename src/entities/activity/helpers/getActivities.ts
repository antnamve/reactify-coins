import { RootState, useAppSelector } from '@/app/appStore'

export function getActivities() {
	const selectActivities = (state: RootState) => state.coins.activities

	return useAppSelector(selectActivities)
}
