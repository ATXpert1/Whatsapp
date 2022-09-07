import React from "react";
import './SidebarChat.css';
function sidebarChat(props) {
    return <div className="sidebarChat">
        <div className="sidebarChat__info">
            <h3>{props.groupName} </h3>
            {props.lastMessage ? <p>{props.lastMessage.username}: {props.lastMessage.content}</p> : null}
        </div>
    </div>
}

export default sidebarChat;