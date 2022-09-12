import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { connectSocket } from "../configs/socket"
import { isExpired } from "react-jwt";
import authActions from '../store/actions/auth'
import appActions from '../store/actions/appActions'

const ProtectedRoute = () => {
    const loggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    const groups = useSelector(state => state.appReducer.groups)

    const dispatch = useDispatch()

    // Load groups into state
    useEffect(() => {
        if (loggedIn) {
            dispatch(appActions.getGroups())
        }
    }, [])

    let token = null
    if (localStorage.getItem('user')) {
        token = JSON.parse(localStorage.getItem("user")).token
    }
    // If jwt expired, log out
    if (token) {
        const isMyTokenExpired = isExpired(token);
        if (isMyTokenExpired) {
            dispatch(authActions.logout())
        }
    }
    // If logged in and groups exist, connect to all chat rooms
    if (loggedIn) {
        if (groups.length) {
            connectSocket(groups.map(group => group._id))
            return <Outlet />
        } else {
            return <Outlet />
        }
    }
    else {
        return <Navigate to="/login" />
    }
};
export default ProtectedRoute;
