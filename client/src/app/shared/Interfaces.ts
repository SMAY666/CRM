export type User = {
    email: string
    password: string
}

export type Message = {
    message: string
}

export type Category = {
    name: string
    imageSrc?: string
    user?: string
    _id?: string
}

export type Position = {
    name: string
    cost: number
    user?: string
    category: string
    _id?: string
}

export type OrderPositions = {
    name: string,
    quantity: number,
    cost: number
}

export type Order = {
    date: Date
    order: number
    list: OrderPositions[]
}
