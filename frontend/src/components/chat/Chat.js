import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, TextField } from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import './Chat.css'
import ChatMessage from "./ChatMessage";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import appActions from '../../store/actions/appActions'

function Chat(props) {
    const messagesEndRef = useRef(null)
    const refsCollection = useRef([])
    const [matchedCount, setMatchedCount] = useState(0)
    const [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state.authReducer.user.id)
    const groupToDisplay = useSelector((state) => state.appReducer.groupToDisplay)
    let groupName = null
    const messages = useSelector((state) => {
        let group = state.appReducer.groups.find((group) => group._id === groupToDisplay)
        groupName = group?.name
        return group?.messages
    })
    const sendMessage = (e) => {
        e.preventDefault()
        dispatch(appActions.sendMessage(groupToDisplay, message))
    }
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({})
    }
    useEffect(scrollToBottom, [messages]);
    const searchChatMessage = (e) => {
        e.preventDefault()
        let matchRefs = refsCollection.current.filter(ref => {
            return ref.innerText.toLowerCase().includes(searchInput.toLowerCase())
        })
        // console.log(matchRefs[0].current)
        setMatchedCount(matchRefs.length)
        matchRefs[0]?.scrollIntoView({})
    }
    useEffect(() => {
        refsCollection.current = refsCollection.current.slice(0, messages?.length);
    }, [messages]);
    return <div className="chat">
        <div className="chat__header">
            <div className="chat__headerInfo">
                <h3>{groupName}</h3>
            </div>
            <div className="chat__headerRight">
                <form onSubmit={(e) => searchChatMessage(e)} style={{display: 'flex'}}>
                    {matchedCount > 0 ? <Typography>Matches found: {matchedCount}</Typography> : null}
                    <SearchOutlined />
                    <TextField name='search' onChange={(e) => { setSearchInput(e.target.value) }} />
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </form>
            </div>
        </div>
        <div className="chat__body">
            {messages?.map((message, index) => {
                return <ChatMessage setRef={(instance) => refsCollection.current[index] = instance} key={index} message={message} currentUserId={currentUserId} />
            })}
            <div ref={messagesEndRef} />
        </div>
        <div className="chat__footer">
            <form onSubmit={sendMessage}>
                <input onChange={e => setMessage(e.target.value)} placeholder="Type a message" type="text"></input>
                <button type="submit">Send a message</button>
            </form>
        </div>
    </div>
}
export default Chat;