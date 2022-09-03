const getStoredUser = () => {
    if (localStorage.getItem('user')) {
        return { isLoggedIn: true, user: JSON.parse(localStorage.getItem("user")) }
    }
    return { isLoggedIn: false, user: null };
}
const initialState = getStoredUser()

function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isLoggedIn: false,
            };
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoggedIn: false,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
export default authReducer