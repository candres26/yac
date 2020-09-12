const socketCli = io();

let msgs = document.getElementById('messages');
let actions = document.getElementById('actions');
let user = document.getElementById('username');
let msg = document.getElementById('message');
let btnSend = document.getElementById('send');

btnSend.addEventListener('click', function(){
    socketCli.emit('usermessage', {
        message: msg.value,
        username: user.value
    });
});

msg.addEventListener('keypress', function(){
    socketCli.emit('usertyping', user.value);
});

socketCli.on('messagesuser', (data) => {
    actions.innerHTML = '';
    msgs.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
    msg.value = '';
});

socketCli.on('user-typing', (data) => {
    actions.innerHTML = `<p><em>${data}</em> esta escribiendo un mensaje ...</p>`
});