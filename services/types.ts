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
        id: string
    }]
}

export type Option = {
    text?: string,
    image?: string
}

export type Auth = {
    token?: string,
    email?: string,
    isAnonymous?: boolean
}