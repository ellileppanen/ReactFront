import axios from "axios";

// const Url = "https://localhost:7165/api/authentication"
const Url = "https://northwindrestapibackendelli.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(Url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }