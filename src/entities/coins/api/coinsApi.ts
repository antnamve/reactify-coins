import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetCoinsResponse, GetHistoryResponse } from '../model/types'

const API_KEY = import.meta.env.VITE_COINRANKING_API_KEY

export const coinsApi = createApi({
	reducerPath: 'coinsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinranking.com/v2/' }),
	refetchOnReconnect: true,
	endpoints: builder => ({
		getCoins: builder.query<GetCoinsResponse, void>({
			query: () => {
				return {
					url: 'coins',
					headers: {
						'X-API-KEY': API_KEY,
					},
				}
			},
		}),
		getHistory: builder.query<GetHistoryResponse, string>({
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
