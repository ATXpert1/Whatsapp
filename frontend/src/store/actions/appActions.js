import customAxios from '../../configs/axios'
import { socket } from "../../configs/socket";

function getGroups() {
    return dispatch => {
        customAxios.get('/users/getUserGroups')
            .then(resp => {
                dispatch({ type: 'GET_GROUPS', payload: resp.data })
            }).catch(err => console.log(err, 'this is the error'))
    }
}
function displayGroup(groupId) {
    return dispatch => {
        dispatch({ type: "CHANGE_CHAT", payload: groupId })
    }
}
function connectToGroups(groups) {
    return dispatch => {
        let groupsIds = groups.map((group)=>{
            return group._id
        })
        // connect socket to chat group
        socket.emit("joinChats", groupsIds)
        // update which chat opened in state
        // dispatch({ type: "CHANGE_CHAT", payload: groupId })
    }
}
function sendMessage(groupId, message) {
    return dispatch => {
        let messageObj = { content: message, groupId: groupId}
        socket.emit("sendMessage", messageObj, (resp) => {
            // messageObj.from = JSON.parse(localStorage.getItem('user')).username
            dispatch({ type: "SEND_MESSAGE", payload: { groupId: groupId, message: resp } })
        })
    }
}
function getMessage(groupId, message) {
    return dispatch => {
        message = { userId: message.userId, username: message.username, content: message.content, timeStamp: message.timeStamp }
        dispatch({ type: "SEND_MESSAGE", payload: { groupId: groupId, message: message } })
    }
}
export default { getGroups, displayGroup, connectToGroups, sendMessage, getMessage }
