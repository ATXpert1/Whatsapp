const initialState = {
    groups: [],
    groupToDisplay: '',
    createGroupStatus: null,
    joinGroupStatus: null
}
function appReducer(state = initialState, action) {
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
            let groupIndex2 = state.groups.findIndex((group) => group._id === payload.groupId)
            let newGroups2 = [...state.groups]
            newGroups2.splice(groupIndex2+1, 1)
            return {...state, groups: newGroups2}
        default:
            return state
    }
}
export default appReducer
