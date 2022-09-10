import AuthService from '../../services/authService'

const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password)
        .then(resp => {
            dispatch({ type: 'LOGIN_SUCCESS', payload: resp })
        }, (err) => {
            dispatch({ type: 'LOGIN_FAIL' })
        })
}
const signup = (username, password) => (dispatch) => {
    return AuthService.signup(username, password).then(resp=>{
        dispatch(login(username, password))
    }).catch(err=>err)
};
const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT' });
}
const authActions = {
    login,
    signup,
    logout
};
export default authActions
