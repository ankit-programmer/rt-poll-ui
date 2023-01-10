import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pollApi } from '../services/poll'
import { userApi } from '../services/user'
import { voteApi } from '../services/vote';
import authReducer from '../services/auth';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [pollApi.reducerPath]: pollApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [voteApi.reducerPath]: voteApi.reducer,
        auth: authReducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pollApi.middleware).concat(userApi.middleware).concat(voteApi.middleware);
    }
    ,
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)