import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, TextField } from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import './Chat.css'
import ChatMessage from "./ChatMessage";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import appActions from '../../store/actions/appActions'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

function Chat(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const MyOptions = [
        "Delete group",
        "Update group"
    ];
    const messagesEndRef = useRef(null)
    const refsCollection = useRef([])
    const [matchedCount, setMatchedCount] = useState(0)
    const [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.authReducer.user)
    const groupToDisplay = useSelector((state) => state.appReducer.groupToDisplay)
    let groupIdAndName = null
    const messages = useSelector((state) => {
        let group = state.appReducer.groups.find((group) => group._id === groupToDisplay)
        groupIdAndName = {id: group?._id, name: group?.name}
        return group?.messages
    })
    const sendMessage = (e) => {
        e.preventDefault()
        dispatch(appActions.sendMessage(groupToDisplay, message))
    }
    const handleGroupOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const handleClose = (e) => {
        if (e.target.innerText === 'Update group') {
            dispatch(appActions)
        }
        if (e.target.innerText === 'Delete group') {
            dispatch(appActions.leaveGroup(groupIdAndName.id, currentUser.id))
        }
        setAnchorEl(null);
    };
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({})
    }
    useEffect(scrollToBottom, [messages]);
    const searchChatMessage = (e) => {
        e.preventDefault()
        let matchRefs = refsCollection.current.filter(ref => {
            return ref.innerText.toLowerCase().includes(searchInput.toLowerCase())
        })
        setMatchedCount(matchRefs.length)
        matchRefs[0]?.scrollIntoView({})
    }
    useEffect(() => {
        refsCollection.current = refsCollection.current.slice(0, messages?.length);
    }, [messages]);
    return <div className="chat">
        <div className="chat__header">
            <div className="chat__headerInfo">
                <h3>{groupIdAndName.name}</h3>
            </div>
            <div className="chat__headerRight">
                <form onSubmit={(e) => searchChatMessage(e)} style={{ display: 'flex' }}>
                    {matchedCount > 0 ? <Typography>Matches found: {matchedCount}</Typography> : null}
                    <SearchOutlined />
                    <TextField name='search' onChange={(e) => { setSearchInput(e.target.value) }} />
                    <IconButton onClick={handleGroupOptions}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted onClose={handleClose}
                        open={open}>
                        {MyOptions.map((option) => (
                            <MenuItem
                                key={option}
                                onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </form>
            </div>
        </div>
        <div className="chat__body">
            {messages?.map((message, index) => {
                return <ChatMessage setRef={(instance) => refsCollection.current[index] = instance} key={index} message={message} currentUserId={currentUser.id} />
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