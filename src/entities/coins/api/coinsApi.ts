import { CoinsResponse } from '@/shared/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coinsApi = createApi({
	reducerPath: 'coinsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinranking.com/v2/' }),
	refetchOnReconnect: true,
	endpoints: builder => ({
		getCoins: builder.query<CoinsResponse, string>({
			query: () => {
				return {
					url: 'coins',
					headers: {
						'X-API-KEY':
							'coinranking5e9056f407d8bb2313e600b29affe406194d1817ddf8225a',
					},
				}
			},
		}),
		getHistory: builder.query<CoinsResponse, string>({
			query: coinId => {
				return {
					url: `coin/${coinId}/history`,
					headers: {
						'X-API-KEY':
							'coinranking5e9056f407d8bb2313e600b29affe406194d1817ddf8225a',
					},
				}
			},
		}),
	}),
})

export const { useGetCoinsQuery, useLazyGetCoinsQuery, useGetHistoryQuery } =
	coinsApi
