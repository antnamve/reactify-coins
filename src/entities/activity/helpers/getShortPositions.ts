import { RootState, useAppSelector } from '@/app/appStore'

export function getShortPositions() {
	const selectShorts = (state: RootState) => state.coins.shortPositions

	return useAppSelector(selectShorts)
}
