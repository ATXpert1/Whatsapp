import React, { useEffect } from 'react';
import './Sidebar';
import './Sidebar.css'
import { Avatar, IconButton } from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import { useSelector, useDispatch } from 'react-redux'
import SidebarChat from './SidebarChat';
import appActions from '../../store/actions/appActions'
import authActions from '../../store/actions/auth';
function Sidebar() {
    const groups = useSelector(state => state.appReducer.groups)
    const dispatch = useDispatch()
    const handleLogoutClick = () => {
        dispatch(authActions.logout())
    }
    const handleGroupClick = (groupId) => {
        dispatch(appActions.displayGroup(groupId))

        // you need to join all groups of user at once, 
    }
    return <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar />
            <div className='sidebar__headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                <IconButton onClick={()=>handleLogoutClick()}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat' type="text" />
            </div>
        </div>
        <div className='sidebar__chats'>
            {groups?.map((group) => {
                return <div key={group._id} onClick={() => handleGroupClick(group._id)}>
                    <SidebarChat groupName={group.name} />
                </div>
            })}
        </div>
    </div>
}

export default Sidebar;