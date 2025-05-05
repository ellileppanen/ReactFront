import axios from "axios";

// const baseUrl = "https://localhost:7165/api/products"
const baseUrl = "https://northwindrestapibackendelli.azurewebsites.net/api/products"

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}

const remove = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.productId}`, object)
}



export default { getAll, create, remove, update }