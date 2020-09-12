const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

// Settings

app.set('port', process.env.PORT || 3000);

// Routes

app.use(express.static(path.join(__dirname, 'login')));

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log(`Server running in port ${app.get('port')} ....`);
});

const io = socketIO.listen(server);

// Websockets
io.on('connection', (socket) => {
    console.log('New conection', socket.id);
    socket.on('usermessage', (data) => {
        io.sockets.emit('messagesuser', data);
    });

    socket.on('usertyping', (usertyp) => {
        console.log(usertyp);
        socket.broadcast.emit('user-typing', usertyp);
    });
});