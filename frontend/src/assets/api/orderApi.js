import { url } from "./url"

export const getAllOrders = () => {
    return url.get('/order/all')
}
export const getOrderById = (id) => {
    return url.get('/order/' + id)
}
export const editOrder = (data) => {
    return url.post('/order/update', data)
}
export const deleteOrder = (id) => {
    return url.delete('/order/' + id)
}
export const createOrder = (data) => {
    return url.post('/order/create', data)
}
export const getOrdersByExecutorId = (id) => {
    return url.get('/order/executor/' + id)
}
export const getOrdersByAuthorId = (id) => {
    return url.get('/order/author/' + id)
}

