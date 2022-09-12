import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appActions from '../store/actions/appActions'
import Button from '@mui/material/Button'

// Popup component to join a group
const JoinGroupModal = (props) => {
    const [groupId, setGroupId] = useState()
    const submitStatus = useSelector((state) => state.appReducer.joinGroupStatus)
    const dispatch = useDispatch()
    const joinGroup = (e) => {
        e.preventDefault()
        dispatch(appActions.joinGroup(groupId, props.userToAddId))
    }

    return <Dialog open={true} >
        <DialogTitle >
            <div style={{ display: 'flex' }}>
                <div>Join group</div>
                <Button variant="secondary" onClick={() => props.closeModal(false)}>
                    Close
                </Button>
            </div>

        </DialogTitle>
        <DialogContent>
            {submitStatus == 'failed' ? <div>Either group doesn't exist, duplicate, or a server error</div> : null}
            {submitStatus == 'success' ? <div>Joined Group!</div> : null}

            <form onSubmit={(e) => joinGroup(e)}>
                <TextField required onChange={(e) => setGroupId(e.target.value)} inputProps={{ minLength: 5 }} />
                <Button variant="secondary" type='submit'>
                    Submit
                </Button>
            </form>
        </DialogContent>
    </Dialog>
}
export default JoinGroupModal
