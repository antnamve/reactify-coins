export const loadInitialState = (localStorageKey: string) => {
	const storedCoins = localStorage.getItem(localStorageKey)
	return storedCoins ? JSON.parse(storedCoins) : []
}
