import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Poll } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
    reducerPath: 'pollApi',
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
        getPolls: builder.query<Poll[], string>({
            query: () => ({
                url: '/poll'
            })
        }),
        getPollById: builder.query<Poll, string>({
            query: (id) => ({
                url: '/poll',
                params: { id }
            }),
        }),
        addNewPoll: builder.mutation({
            query: (poll) =>
            ({
                url: '/poll',
                method: 'POST',
                body: poll
            }),
        })
    }),
})

export const { useGetPollByIdQuery, useAddNewPollMutation, useGetPollsQuery} = pollApi;