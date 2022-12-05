import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Poll } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.rtpoll.com',
        prepareHeaders: (headers, { getState }) => {
            const token = store.getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUser: builder.query<Poll, string>({
            query: () => {
                return {
                    url: '/user'
                }
            },
        })
    }),
})

export const { useGetUserQuery } = userApi;