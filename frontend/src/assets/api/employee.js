import { url } from "./url"

export const getAllEmployees = () => {
    return url.get('/users/all')
}
export const getEmployeeById = (id) => {
    return url.get('/users/' + id)
}
export const editEmployee = (data) => {
    return url.post('/users/update', data)
}
export const deleteEmployee = (id) => {
    return url.delete('/users/' + id)
}
export const createEmployee = (data) => {
    return url.post('/users/create', data)
}
