import React from "react";
import './ChatMessage.css'
function ChatMessage(props) {
    return <div >
        {/* if it's the user that signed in make it green 
        replace true with: message.name === user.name*/}
        <p className={`chat__message ${props.message.userId === props.currentUserId && 'chat__reciever'}`}>
            <span className="chat__name">{props.message.username}</span>
            {props.message.content}
            <span className="chat__timestamp">{props.message.timeStamp}</span>
        </p>
    </div>
}

export default ChatMessage;
