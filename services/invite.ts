import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Invite } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const inviteApi = createApi({
    reducerPath: 'inviteApi',
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
    tagTypes: ['Invite'],
    endpoints: (builder) => ({
        getInvites: builder.query<Invite[], string>({
            query: (pollId) => ({
                url: `/invite/${pollId}`
            }),
            providesTags: (result, error, pollId) => [{ type: 'Invite', id: pollId }]
        }),
        addInvites: builder.mutation<Invite[], { pollId: string, emails: string[] }>({
            query: ({ pollId, emails }) => ({
                url: `/invite/${pollId}`,
                method: 'POST',
                body: emails.map(email => ({ type: 'email', email }))
            }),
            invalidatesTags: (result, error, { pollId }) => [{ type: 'Invite', id: pollId }]
        }),
        deleteInvite: builder.mutation<any, { pollId: string, inviteId: string }>({
            query: ({ pollId, inviteId }) => ({
                url: `/invite/${pollId}`,
                method: 'DELETE',
                params: { inviteId }
            }),
            invalidatesTags: (result, error, { pollId }) => [{ type: 'Invite', id: pollId }]
        })
    }),
})

export const { useGetInvitesQuery, useAddInvitesMutation, useDeleteInviteMutation } = inviteApi;
