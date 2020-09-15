const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

// Settings

app.set('port', process.env.PORT || 5000);

// Routes

// app.use(express.static(path.join(__dirname, 'login')));

app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/', (req, res) => {
    res.send("Server running ....");
}); */

const server = app.listen(app.get('port'), () => {
    console.log(`Server running in port ${app.get('port')} ....`);
});

const io = socketIO.listen(server);

// Websockets
io.on('connection', (socket) => {
    console.log('New conection', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconected :( !!');
    });
    socket.on('message', (data) => {
        console.log(`${data.user} => ${data.msg} `);
        io.sockets.emit('messageUser', data);
        // socket.emit('messageUser', data);
    });

    socket.on('usertyping', (usertyp) => {
        console.log(usertyp);
        socket.broadcast.emit('user-typing', usertyp);
    });
});