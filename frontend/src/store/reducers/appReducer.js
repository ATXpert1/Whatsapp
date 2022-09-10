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
            let groupIndex = state.groups.findIndex((group) => group._id === payload.groupId)
            let newGroups = state.groups;
            newGroups.unshift(newGroups[groupIndex]);
            newGroups.splice(groupIndex + 1, 1);
            newGroups[0].messages = [...newGroups[0].messages, payload.message]
            return { ...state, groups: newGroups }
        case 'CREATE_GROUP_SUCCESS':
            return { ...state, groups: [...state.groups, payload.group], createGroupStatus: 'success' }
        case 'CREATE_GROUP_FAILED':
            return { ...state, createGroupStatus: 'failed' }
        case 'JOIN_GROUP_SUCCESS':
            return { ...state, groups: [...state.groups, payload.group], joinGroupStatus: 'success' }
        case 'JOIN_GROUP_FAILED':
            return { ...state, joinGroupStatus: 'failed' }
        case 'REMOVE_GROUP':
            // groupIndex = state.groups.findIndex((group) => group._id === payload.groupId)
            // let newGroup = [...state.groups[groupIndex]]
            // newGroup.splice(groupIndex, 1)
            return {
                ...state, groups: [
                    ...state.groups.slice(0, payload.groupId),
                    ...state.groups.slice(payload.groupId + 1)
                ]
            }
        default:
            return state
    }
}
export default appReducer
