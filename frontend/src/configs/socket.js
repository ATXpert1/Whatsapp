const io = require("socket.io-client");

export var socket = null

// export const socket = io.connect('http://localhost:8000', {
//     query: { token }
// });




export const connectSocket = (groupsId) => {
    if (socket) return
    console.log('connect socket')
    // Connect socket
    let token = null
    if (localStorage.getItem('user')) {
        token = JSON.parse(localStorage.getItem("user")).token
    }
    socket = io.connect('http://localhost:8000', {
        query: { token }
    });

    socket.emit("joinChats", groupsId)
    window.socket = socket

}
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}

export const useSockets = (dispatcher) => {

    return {
        connectSocket,
    }
};