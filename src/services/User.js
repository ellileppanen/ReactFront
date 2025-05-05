import axios from "axios";

//const baseUrl = "https://localhost:7165/api/users"
const baseUrl = "https://northwindrestapibackendelli.azurewebsites.net/api/users"

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object)
}
 


export default { getAll, create, remove, update }