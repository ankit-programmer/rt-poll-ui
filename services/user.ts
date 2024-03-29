import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Poll, User } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:4000',
        baseUrl: 'https://api.rtpoll.com',
        prepareHeaders: (headers, { getState }) => {
            const token = store.getState().auth.token;
            console.log("Token", token);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user: User) => ({
                url: '/user',
                method: 'POST',
                body: user
            })
        }),
        getUser: builder.query<User, string>({
            query: () => {
                return {
                    url: '/user'
                }
            },
        }),
        mergeUser: builder.mutation<any, any>({
            query: (anonymousToken: string) => {
                return {
                    url: '/user/merge',
                    body: {
                        'anonymousToken': anonymousToken
                    },
                    method: 'POST'
                }
            }
        })
    }),
})

export const { useGetUserQuery, useMergeUserMutation, useCreateUserMutation, useLazyGetUserQuery } = userApi;