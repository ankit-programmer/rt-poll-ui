import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Vote } from './types'
import { store } from '../app/store';
import ReconnectingWebSocket from 'reconnecting-websocket';
// Define a service using a base URL and expected endpoints

const wsUrlProvider = async (arg: string) => {
    return `wss://ws.rtpoll.com/poll/${arg}?token=${store.getState().auth.token}`;
}
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
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                if (!arg) return;
                const urlProvider = () => {
                    // return `ws://localhost:5000/poll/${arg}?token=${store.getState().auth.token}`
                    return `wss://ws.rtpoll.com/poll/${arg}?token=${store.getState().auth.token}`
                }
                const ws = new ReconnectingWebSocket(urlProvider, [], {
                    maxRetries: 20
                });
                try {
                    await cacheDataLoaded;
                    const listener = (event: MessageEvent) => {

                        const data = JSON.parse(event.data);
                        console.log(data);
                        const payload = data?.payload;
                        updateCachedData((draft) => {
                            switch (data?.type) {
                                case 'vote_added': {
                                    const tempData = { ...draft };
                                    tempData.options[payload?.optionId].count++;
                                    tempData.total++;
                                    tempData.selected = (payload?.uid == store.getState().auth.uid) ? payload?.optionId : tempData.selected;
                                    Object.assign(draft, tempData);

                                    break;
                                }
                                case 'vote_removed': {
                                    const tempData = { ...draft };
                                    tempData.options[payload?.optionId].count--;
                                    tempData.total--;
                                    tempData.selected = (payload?.uid == store.getState().auth.uid) ? 'null' : tempData.selected;
                                    Object.assign(draft, tempData);
                                }

                                    break;
                                case 'sync_vote': {
                                    const tempData = { ...draft };
                                    if (tempData?.pollId == payload?.pollId) {
                                        if (!payload?.total || !payload?.options) return;
                                        tempData.total = payload?.total;
                                        tempData.options = { ...tempData?.options, ...payload?.options };
                                        Object.assign(draft, tempData);
                                    }
                                }

                                    break;
                                default:
                                    break;
                            }

                        })
                    }
                    ws.addEventListener('message', listener);
                } catch {

                }
                await cacheEntryRemoved;
                ws.close();
            }
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

export const { useGetVoteByIdQuery, useLazyGetVoteByIdQuery, useAddVoteMutation, useGetVotesQuery } = voteApi;