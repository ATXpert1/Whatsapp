const io = require("socket.io-client");

export let socket = null

// export const socket = io.connect('http://localhost:8000', {
//     query: { token }
// });

export const connectSocket = (groupsId) => {
    if (socket) return
    // Connect socket
    let token = null
    if (localStorage.getItem('user')) {
        token = JSON.parse(localStorage.getItem("user")).token
    }
    socket = io.connect('http://localhost:8000', {
        query: { token }
    });
    socket.emit("joinChats", groupsId)
}
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}