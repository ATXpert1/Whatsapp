const initialState = {
    groups: [],
    groupToDisplay: ''
}
function appReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'GET_GROUPS':
            return state = {...state, groups: payload}
        case 'CHANGE_CHAT':
            return {...state, groupToDisplay: payload}
        case 'SEND_MESSAGE':
            let groupIndex = state.groups.findIndex((group)=>group._id===payload.groupId)
            let newGroups = state.groups;
            newGroups[groupIndex].messages = [...newGroups[groupIndex].messages, payload.message]
            return {...state, groups: newGroups}
        default:
            return state
    }
}
export default appReducer
