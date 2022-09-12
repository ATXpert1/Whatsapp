import { useState } from 'react'
import authActions from '../store/actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography, Link } from "@material-ui/core"
const Login = (props) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
    const paperStyle = { padding: 20, height: '70vh', width: 280 }
    const btnStyle = { margin: '8px 0' }

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(authActions.signup(username, password))
    }
    // redirect to app if already logged in
    if (isLoggedIn) {
        return <Navigate to='/' />
    }
    return (
        <Grid >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField label='Username' placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} inputProps={{ minLength: "5", maxLength: "20" }} fullWidth required />
                    <TextField label='Password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} inputProps={{ minLength: "5", maxLength: "25" }} type='password' fullWidth required />
                    <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>Sign In</Button>
                    <Typography> Do you have an account?
                        <Link href='/login'>Sign In</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>)
}
export default Login
