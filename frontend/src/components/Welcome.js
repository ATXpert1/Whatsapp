import { Typography, createTheme } from "@material-ui/core"
import './Welcome.css'

function Welcome() {
    return <div className="welcome" >
        <Typography variant="h4">Welcome to my WhatsApp clone I built from scratch,
            you are welcome to browse through all the chats, speak to other people, create your own groups and invite others.
        </Typography>

        <Typography style={{ paddingTop: '150px', textAlign: 'left' }}>
            *On account creation, you will be added to 3 default public groups <br />
            *In order to join a group you need to provide a group ID that you got from another person <br />
            *Only admins can remove users from group but eveyone can add or join
        </Typography>
    </div>
}
export default Welcome
