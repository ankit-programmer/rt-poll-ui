
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