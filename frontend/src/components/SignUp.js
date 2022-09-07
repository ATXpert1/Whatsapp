import { useState } from 'react'
import authActions from '../store/actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(authActions.signup(username, password))
    }
    if (isLoggedIn) {
        return <Navigate to='/' />
    }
    return <div>
        <h3>Sign Up</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' placeholder='User Name' onChange={(e) => setUsername(e.target.value)}></input> <br />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input> <br />
            <input type='submit'></input>
        </form>
    </div>
}
export default Login
