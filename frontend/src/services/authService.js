import customAxios, { getToken } from '../configs/axios'
import { disconnectSocket } from '../configs/socket'
class AuthService {
    signup = (username, password) => {
        return customAxios.post('/auth/signup', { username, password })
            .then(resp => resp.data)
            .catch(err => { throw new Error(err) })
    };
    login = (username, password) => {
        return customAxios.post('/auth/login', { username: username, password: password }).then(resp => {
            localStorage.setItem('user', JSON.stringify(resp.data))
            customAxios.defaults.headers['x-access-token'] = getToken()
            return resp.data
        }).catch(err => { throw new Error(err) })
    }
    logout = () => {
        localStorage.removeItem('user')
        disconnectSocket()
    }
}

export default new AuthService();
