export type OrderProduct = {
    name: string,
    price: number,
    quantity: number,
    sku: string
};

export type Order = {
    id: number,
    user_name: string,
    email: string,
    phone: string,
    order_status_id: string,
    creation_date: string,
    status_code: string,
    status_name: string,
    products: OrderProduct[]
}