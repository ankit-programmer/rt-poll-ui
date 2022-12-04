import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Poll } from './types'
import { store } from '../app/store';
// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
    reducerPath: 'pollApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.rtpoll.com',
        prepareHeaders: (headers, { getState }) => {
            const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5raXQgS3VtYXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MzZhRm5oUGxVR3UzTWtjZ2cxNlRCU2ZSUXlfX2IwNEgwajhVOEs9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcnQtcG9sbCIsImF1ZCI6InJ0LXBvbGwiLCJhdXRoX3RpbWUiOjE2Njk5MjAzNDksInVzZXJfaWQiOiJKTUZuRkJCNUtOYWxCWkE2dHVzY2oydDVIUzkyIiwic3ViIjoiSk1GbkZCQjVLTmFsQlpBNnR1c2NqMnQ1SFM5MiIsImlhdCI6MTY2OTk2MzA5OSwiZXhwIjoxNjY5OTY2Njk5LCJlbWFpbCI6ImFua2l0a3VtYXJAd2hvenphdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDA5MDAxOTMyMDMwMDYyMjMwNyJdLCJlbWFpbCI6WyJhbmtpdGt1bWFyQHdob3p6YXQuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.qUpWsy5B7jJP-nvzuxklq-gQQdwZU_A3Fso2KRKIp-1aEafXkYR77wJfneXh9xSvPd71P5IoXXm7mqfZKqfP1ldn1nZs8tsFLdUOPcgLrzqt_d-4aZ5hmj3MsHJDeNzTYXTa5S-RsPu-czzEw70Fk85XL1jlssU7e4LkP9VjsuNM9Al8rTuj1cmzNTzQSt3l-o0p15eHvIUL1ja-2AX63-B7vzQGkNAJHhH63MXAJ1_3oUnPNlCtBoKPZTL2XxLlzHqF4vQARX74USZxukWK1Gku0ltE5GkE67V94aMLyGW0ZPzXQamiiEfqdkKlcB_hktnL7IHONqYo-zxKqTNhRQ";
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPollById: builder.query<Poll, string>({
            query: (id) => {
                return {
                    url: '/poll',
                    params: { id }
                }
            },
        }),
        addNewPoll: builder.query<Poll, string>({
            query: (poll) => {
                console.log(poll);
                return {
                    url: '/poll',
                    method: 'POST',
                    body: poll
                }
            }
        })
    }),
})

export const { useGetPollByIdQuery, useAddNewPollQuery } = pollApi;