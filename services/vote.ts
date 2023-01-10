import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Vote } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const voteApi = createApi({
    reducerPath: 'voteApi',
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
        getVotes: builder.query<Vote[], string>({
            query: () => ({
                url: `/vote`
            })
        }),
        getVoteById: builder.query<Vote, string>({
            query: (id) => ({
                url: `/vote/${id}`
            }),
        }),
        addVote: builder.mutation({
            query: (vote) =>
            ({
                url: `/vote/${vote.pollId}`,
                params: {
                    optionId: vote.optionId
                },
                method: 'POST'
            }),
            async onQueryStarted({ vote, ...patch }, { dispatch, queryFulfilled }) {
                console.log("VOTE", vote)
                const patchResult = dispatch(voteApi.util.updateQueryData('getVoteById', vote?.pollId, (draft) => {
                    console.log("DRAFT", draft);
                    Object.assign(draft, patch);
                }))
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo();
                }
            }
        })
    }),
})

export const { useGetVoteByIdQuery, useAddVoteMutation, useGetVotesQuery } = voteApi;