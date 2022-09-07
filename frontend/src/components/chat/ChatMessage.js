import React, { useEffect, useState } from "react";
import './ChatMessage.css'
function ChatMessage(props) {
    const [time, setTime] = useState()
    useEffect(()=>{
        var today = new Date(props.message.timeStamp);
        today.setHours(today.getHours());
        setTime(today.toString().slice(4, 24))
    }, [])

    return <div >
        <p className={`chat__message ${props.message.userId === props.currentUserId && 'chat__reciever'}`}>
            <span className="chat__name">{props.message.username}</span>
            <span ref={props.setRef}>{props.message.content}</span>
            <br />
            <span className="chat__timestamp">{
            time}
            </span>
        </p>
    </div>
}

export default ChatMessage;
