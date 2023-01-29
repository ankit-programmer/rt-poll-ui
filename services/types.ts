export type Vote = {
    "pollId": string,
    "total": number,
    "options": {
        [key: string]: { count: number }
    },
    "selected": string
}



export type Poll = {
    id: string,
    title: string,
    owner: string,
    options: [{
        text: string,
        id: string,
        image?: string
    }]
}

export type Option = {
    text?: string,
    image?: string,
    count?: number
}

export type Auth = {
    token?: string,
    email?: string,
    isAnonymous?: boolean,
    uid?: string
}

export interface User {
    id?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email?: string,
    avatar?: string,
    emailVerified?: boolean,
    gender?: "male" | "female"
}