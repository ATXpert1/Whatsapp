import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CreateGroupModal from '../CreateGroupModal';
import JoinGroupModal from '../JoinGroupModal';

import './Sidebar';
import './Sidebar.css'
import { IconButton } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import { useSelector, useDispatch } from 'react-redux'
import SidebarChat from './SidebarChat';
import appActions from '../../store/actions/appActions'
import authActions from '../../store/actions/auth';

function Sidebar() {
    const dispatch = useDispatch()
    const [activeList, setActiveList] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
    const [openJoinGroupModal, setOpenJoinGroupModal] = useState(false)
    const username = useSelector(state => state.authReducer.user.username)
    let groups = null
    const messages = useSelector(state => {
        groups = state.appReducer.groups
        return groups.map((group) => group.messages)
    })
    const handleLogoutClick = () => {
        dispatch(authActions.logout())
    }
    const handleGroupClick = (groupId, index) => {
        dispatch(appActions.displayGroup(groupId))
        setActiveList(groupId)
    }
    const handleSearchFilter = () => {
        return groups?.filter(group => group.name.toLowerCase().includes(searchInput.toLowerCase()))
    }
    return <div className='sidebar'>
        <div className='sidebar__header'>
            <h2>Welcome {username}</h2>
            <div className='sidebar__headerRight'>
                <IconButton onClick={() => handleLogoutClick()}>
                    <ExitToAppIcon />
                    <div>Logout</div>
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        {/* create group button */}
        <Button variant="primary" onClick={()=>setOpenCreateGroupModal(true)}>
            Create group
        </Button>
        {/* create group form */}
        {openCreateGroupModal && <CreateGroupModal closeModal={setOpenCreateGroupModal}/>}
        {/* join group button */}
        <Button variant="primary" onClick={()=>setOpenJoinGroupModal(true)}>
            Join group
        </Button>
        {/* join group form */}
        {openJoinGroupModal && <JoinGroupModal closeModal={setOpenJoinGroupModal}/>}
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat' type="text" onChange={(e) => setSearchInput(e.target.value)} />
            </div>
        </div>
        <div className='sidebar__chats'>
            {
                // render all groups in sidebar, based on what's inside search input
                handleSearchFilter().map((group) => {
                    return <div style={{ backgroundColor: activeList === group._id ? '#ebebeb' : 'white' }} key={group._id} onClick={() => handleGroupClick(group._id)}>
                        <SidebarChat groupName={group.name} lastMessage={group.messages.length ? group.messages[group.messages.length - 1] : null} />
                    </div>
                })}
        </div>
    </div>
}

export default Sidebar;