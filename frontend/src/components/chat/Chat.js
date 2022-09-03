import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Avatar, IconButton, responsiveFontSizes } from "@material-ui/core"
import './Chat.css'
import ChatMessage from "./ChatMessage";
import AttachFile from "@material-ui/icons/AttachFile";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import appActions from '../../store/actions/appActions'

function Chat(props) {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const currentUserId = useSelector((state)=>state.authReducer.user.id)
    const groupToDisplay = useSelector((state) => state.appReducer.groupToDisplay)
    const messages = useSelector((state) => {
        return state.appReducer.groups.find((group) => group._id === groupToDisplay)?.messages
    })

    const sendMessage = (e) => {
        e.preventDefault()
        dispatch(appActions.sendMessage(groupToDisplay, message))
    }
    return <div className="chat">
        <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
                <h3>Room name</h3>
                <p>Last seen</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className="chat__body">
            {messages?.map((message, index) => {
                return <ChatMessage key={index} message={message} currentUserId={currentUserId}/>
            })}
        </div>
        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form onSubmit={sendMessage}>
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message" type="text"></input>
                <button type="submit">Send a message</button>
            </form>
            <MicIcon />
        </div>
    </div>
}
export default Chat;
