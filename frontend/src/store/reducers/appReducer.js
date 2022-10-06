const initialState = {
    groups: [],
    groupToDisplay: '',
    createGroupStatus: null,
    joinGroupStatus: null
}
function appReducer(state = initialState, action) {
    console.log(action)
    const { type, payload } = action;
    switch (type) {
        case 'GET_GROUPS':
            return state = { ...state, groups: payload }
        case 'CHANGE_CHAT':
            return { ...state, groupToDisplay: payload }
        case 'SEND_MESSAGE':
            let groupIndex1 = state.groups.findIndex((group) => group._id === payload.groupId)
            let newGroups1 = state.groups;
            newGroups1.unshift(newGroups1[groupIndex1]);
            newGroups1.splice(groupIndex1 + 1, 1);
            newGroups1[0].messages = [...newGroups1[0].messages, payload.message]
            return { ...state, groups: newGroups1 }
        case 'CREATE_GROUP_SUCCESS':
            return { ...state, groups: [...state.groups, payload.group], createGroupStatus: 'success' }
        case 'CREATE_GROUP_FAILED':
            return { ...state, createGroupStatus: 'failed' }
        case 'JOIN_GROUP_SUCCESS':
            return { ...state, groups: [...state.groups, payload.group], joinGroupStatus: 'success' }
        case 'JOIN_GROUP_FAILED':
            return { ...state, joinGroupStatus: 'failed' }
        case 'REMOVE_GROUP':
            let groupIndex2 = state.groups.findIndex((group) => group._id === payload)
            let newGroups2 = [...state.groups]
            newGroups2.splice(groupIndex2, 1)
            return { ...state, groups: newGroups2 }
        case 'REMOVE_USER_FROM_GROUP':
            let groupIndex3 = state.groups.findIndex((group) => group._id === payload.groupId)
            let newGroups3 = [...state.groups]
            let userToRemoveIndex = newGroups3[groupIndex3].participants.findIndex((user) => user.userId === payload.userToRemoveId)
            newGroups3[groupIndex3].participants.splice(userToRemoveIndex, 1)
            newGroups3[groupIndex3].participants = [...newGroups3[groupIndex3].participants]
            return { ...state, groups: newGroups3 }
        case 'JOIN_USER_TO_GROUP':
            let groupIndex4 = state.groups.findIndex((group) => group._id === payload.groupId)
            let newGroups4 = [...state.groups]
            newGroups4[groupIndex4].participants.push({ userId: payload.userToAddId, username: payload.username })
            newGroups4[groupIndex4].participants = [...newGroups4[groupIndex4].participants]
            return { ...state, groups: newGroups4 }
        default:
            return state
    }
}
export default appReducer
