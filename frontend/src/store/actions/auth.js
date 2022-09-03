import customAxios from '../../configs/axios'
import AuthService from '../../services/authService'

const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password)
        .then(resp => {
            dispatch({ type: 'LOGIN_SUCCESS', payload: resp })
        }, (err) => {
            dispatch({ type: 'LOGIN_FAIL' })
        })
}
const register = (username, email, password) => (dispatch) => {
    return customAxios.post('/auth/signup', { username, email, password }).then(
    );
};
const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT' });
}
const authActions = {
    login,
    register,
    logout
};
export default authActions
