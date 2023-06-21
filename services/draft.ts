import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Poll } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const draftApi = createApi({
    reducerPath: 'draftApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:4000',
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
        getDraft: builder.query<Poll, string>({
            query: (arg?:any) => ({
                url: '/draft'
            })
        }),
        saveDraft: builder.mutation({
            query: (poll) =>
            ({
                url: '/draft',
                method: 'POST',
                body: poll
            }),
        }),
        deleteDraft: builder.mutation({
            query: (arg?: any) => ({
                url: '/draft',
                method: 'DELETE'
            })
        })
    }),
})

export const { useGetDraftQuery, useSaveDraftMutation, useLazyGetDraftQuery, useDeleteDraftMutation } = draftApi;