import { Button } from "@material-ui/core"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import './popup.css'
import appActions from '../../../store/actions/appActions'
import { useEffect, useState, useSyncExternalStore } from "react"

function GroupInfoPopup(props) {
    const participants = useSelector(state => state.appReducer.groups.find(group => group._id === props.group?._id)?.participants)
    const [toggleAddOrRemove, setToggleAddOrRemove] = useState(false)
    const [userToAdd, setUserToAdd] = useState('')
    const dispatch = useDispatch()
    const removeUser = (userId) => {
        dispatch(appActions.leaveGroup(props.group._id, userId))
    }
    const addUser = () => {
        dispatch(appActions.joinGroup(props.group._id, userToAdd))
        setToggleAddOrRemove(false)
    }
    return (props.trigger) ? (
        <div className="popup">
            <Button onClick={() => props.setTrigger(false)}>Close</Button>
            <Button onClick={() => setToggleAddOrRemove(true)}>Add user</Button>
            {(toggleAddOrRemove) ? <div>
                <div>Enter User's ID to add</div>
                <input type="text" onChange={(e) => setUserToAdd(e.target.value)}></input>
                <Button onClick={addUser}>Submit</Button> <br />
                <Button onClick={() => setToggleAddOrRemove(false)}>Cancel</Button>
            </div> :
                <div>
                    Users in group: <br />
                    You: {props.currentUser.username}
                    {participants?.filter((user) => user.userId != props.currentUser.id).map((user) => {
                        return <div key={user.userId}>
                            {user.username}
                            {(props.currentUser.id === props.group.admins[0]) ? <Button onClick={() => removeUser(user.userId)}>
                                Remove
                            </Button> : ""}
                        </div>
                    })}
                </div>}
        </div>) : ''
}
export default GroupInfoPopup
