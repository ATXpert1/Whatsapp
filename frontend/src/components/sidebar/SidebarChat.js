import React from "react";
import './SidebarChat.css';
function sidebarChat(props) {
    return <div className="sidebarChat">
        <div className="sidebarChat__info">
            <h4>{props.groupName} </h4>
            <p>Last message...</p>
        </div>
    </div>
}

export default sidebarChat;