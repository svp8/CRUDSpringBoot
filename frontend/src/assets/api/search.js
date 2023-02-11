import { url } from "./url"

export const searchByAttribute = (className,attribute,query) => {
    return url.post('/search',{
        className:className,
        attribute:attribute,
        query:query
    })
}
export const searchByOrderAttribute = (orders,attribute,query) => {
    return url.post('/search/order',{
        className:"Order",
        attribute:attribute,
        query:query,
        orders:orders
    })
}