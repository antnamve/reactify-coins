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
			query: uuid => {
				return {
					url: `coin/${uuid}/history`,
					headers: {
						'X-API-KEY': API_KEY,
					},
				}
			},
		}),
	}),
})

export const { useGetCoinsQuery, useGetHistoryQuery } = coinsApi
