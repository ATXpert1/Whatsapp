import customAxios from '../../configs/axios'
import { socket } from "../../configs/socket";

const getStoredUser = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem("user")).id
    } else {
        return null
    }
}
function getGroups() {
    return dispatch => {
        customAxios.get('/users/getUserGroups')
            .then(resp => {
                dispatch({ type: 'GET_GROUPS', payload: resp.data })
            }).catch(err => console.log(err, 'this is the error'))
    }
}
function leaveGroup(groupId, userToRemoveId) {
    return dispatch => {
        customAxios.post('/groups/leaveUserFromGroup', { groupId, userToRemoveId })
            .then(resp => {
                if (getStoredUser() === userToRemoveId) {
                    dispatch({ type: 'REMOVE_GROUP', payload: groupId })
                } else {
                    dispatch({ type: 'REMOVE_USER_FROM_GROUP', payload: { groupId: groupId, userToRemoveId: userToRemoveId } })
                }
            })
            .catch(err => console.log(err, 'leavegroup'))
    }
}
function joinGroup(groupId, userToAddId) {
    return dispatch => {
        customAxios.post('/groups/joinGroup', { groupId: groupId, userToAddId: userToAddId })
            .then(resp => {
                if (getStoredUser() === userToAddId) {
                    dispatch({ type: 'JOIN_GROUP_SUCCESS', payload: { group: resp.data.group } })
                } else {
                    console.log(resp.data.username, 'right cell')
                    dispatch({ type: 'JOIN_USER_TO_GROUP', payload: { groupId: groupId, userToAddId: userToAddId, username: resp.data.username } })
                }
            })
            .catch(err => dispatch({ type: 'JOIN_GROUP_FAILED' }))
    }
}
function displayGroup(groupId) {
    return dispatch => {
        dispatch({ type: "CHANGE_CHAT", payload: groupId })
    }
}

function sendMessage(groupId, message) {
    return dispatch => {
        let messageObj = { content: message, groupId: groupId }
        socket.emit("sendMessage", messageObj, (resp) => {
            dispatch({ type: "SEND_MESSAGE", payload: { groupId: groupId, message: resp } })
        })
    }
}
function createGroup(groupName) {
    return dispatch => {
        customAxios.post('/groups/createGroup', { groupName: groupName })
            .then(resp => dispatch({ type: 'CREATE_GROUP_SUCCESS', payload: { group: resp.data } }))
            .catch(err => dispatch({ type: 'CREATE_GROUP_FAILED' }))
    }
}

function getMessage(groupId, message) {
    return dispatch => {
        message = { userId: message.userId, username: message.username, content: message.content, timeStamp: message.timeStamp }
        dispatch({ type: "SEND_MESSAGE", payload: { groupId: groupId, message: message } })
    }
}
export default { getGroups, displayGroup, sendMessage, getMessage, createGroup, joinGroup, leaveGroup }
