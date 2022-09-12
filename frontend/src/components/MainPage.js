import { socket } from "../configs/socket";

import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import Sidebar from "./sidebar/Sidebar"
import appActions from '../store/actions/appActions'
import Chat from './chat/Chat'

const MainMenu = (props) => {
    const dispatch = useDispatch()
    // Listen for new messages, don't if already listening
    useEffect(() => {
        if (!socket?.hasListeners('messageFromUser')) {
            socket?.on("messageFromUser", (resp) => {
                dispatch(appActions.getMessage(resp.groupId, resp))
            })
        }
    }, [])
    return <div className="app__body">
        <Sidebar />
        <Chat />
    </div>
}
export default MainMenu
