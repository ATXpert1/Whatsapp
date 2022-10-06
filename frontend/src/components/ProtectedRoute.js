import React, { useEffect, useState } from "react";
import { socket } from "../configs/socket";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { connectSocket } from "../configs/socket"
import { isExpired } from "react-jwt";
import authActions from '../store/actions/auth'
import appActions from '../store/actions/appActions'
import { Loader } from "./loader";

const ProtectedRoute = () => {
    const loggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    const groups = useSelector(state => state.appReducer.groups)
    const [isAppReady,setAppReady] = useState(false)

    const dispatch = useDispatch()

    // Load groups into state
    
    useEffect(() => {
        if (groups?.length) {
            setAppReady(true)
        }
    }, [groups])

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
        if (isAppReady) {
            connectSocket(groups.map(group => group._id))
            console.log("groups")
            return groups && <Outlet />
        }
        console.log("not groups")        ;
        //laoder
        // return <Outlet />
        return <Loader />
    }
    else {
        return <Navigate to="/login" />
    }
};
export default ProtectedRoute;
