const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
const groupsBL = require('./models/groupsBL')
const path = require('path')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const mountRoutes = require('express-mount-routes');
const authRouter = require('./controllers/authController')
const requireJWT = require('./middleware/authMiddleware')
const groupsRouter = require('./Routers/groupsRouter')
const usersRouter = require('./Routers/usersRouter')

const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../.env')});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

require('./configs/database')
app.use(cors(corsOptions))
app.use(express.json());

server.listen(8000);

app.use('/api/auth', authRouter)
app.use('/api/groups', requireJWT, groupsRouter)
app.use('/api/users', requireJWT, usersRouter)
// ------------- deployment --------
__dirname = path.resolve();
if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')))
    mountRoutes(app);
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}
// ------------- deployment --------


module.exports = io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.RSA_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: "Token Incorrect" })
            } else {
                socket.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(500).send({ auth: false, message: "Authentication error" })
    }
})
    .on('connection', (socket) => {
        socket.on('joinChats', (groups) => {
            // join socket to group
            socket.join(groups)
            // emit welcome message to spe
            socket.on('sendMessage', (message, callback) => {
                message.username = socket.decoded.username
                message.userId = socket.decoded.id
                groupsBL.addMessageToGroup(message.groupId, message).then(resp => {
                    callback(resp)
                    resp.groupId = message.groupId
                    resp = { groupId: message.groupId, username: resp.username, userId: resp.userId, timeStamp: resp.timeStamp, content: resp.content }
                    socket.broadcast.to(message.groupId).emit('messageFromUser', resp);
                })
            })
        });
        socket.on('disconnect', () => {
        })
    });
