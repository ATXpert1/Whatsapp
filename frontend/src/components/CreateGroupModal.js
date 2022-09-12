import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appActions from '../store/actions/appActions'
import Button from '@mui/material/Button'

// Popup component to create group
const CreateGroupModal = (props) => {
    const [groupName, setGroupName] = useState()
    const submitStatus = useSelector((state) => state.appReducer.createGroupStatus)
    const dispatch = useDispatch()
    const createGroup = (e) => {
        e.preventDefault()
        dispatch(appActions.createGroup(groupName))
    }

    return <Dialog open={true} >
        <DialogTitle >
            <div style={{ display: 'flex' }}>
                <div>Add group</div>
                <Button variant="secondary" onClick={() => props.closeModal(false)}>
                    Close
                </Button>
            </div>

        </DialogTitle>
        <DialogContent>
            {submitStatus == 'failed' ? <div>Either group exists, or it's a server error</div> : null}
            {submitStatus == 'success' ? <div>Added Group!</div> : null}

            <form onSubmit={(e) => createGroup(e)}>
                <TextField required onChange={(e) => setGroupName(e.target.value)} inputProps={{ minLength: "5", maxLength: "25" }} />
                <Button variant="secondary" type='submit'>
                    Submit
                </Button>
            </form>
        </DialogContent>
    </Dialog>
}
export default CreateGroupModal
