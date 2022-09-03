import axios from 'axios'
export const getToken = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem("user")).token
    }
}
let customAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'x-access-token': getToken()
    }
})
export default customAxios
