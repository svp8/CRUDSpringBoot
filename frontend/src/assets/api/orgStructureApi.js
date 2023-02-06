import { url } from "./url"

export const getAllDepartments = () => {
    return url.get('/department/all')
}
export const getDepartmentById = (id) => {
    return url.get('/department/' + id)
}
export const editDepartment = (data) => {
    return url.post('/department/update', data)
}
export const deleteDepartment = (id) => {
    return url.delete('/department/' + id)
}
export const createDepartment = (data) => {
    return url.post('/department/create', data)
}
