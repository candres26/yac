import React, { Component } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

let socket;

class Chat extends Component{

    constructor(props){
        super();
        const data = queryString.parse(props.location.search);
        this.state = {
            nickname: data.name,
            msg: ''
        };
    }
    
    componentDidMount(){
        socket = io('localhost:5000');
        console.log(socket);
        socket.on('messageUser', data => {
            console.log(`${data.user}: ${data.msg}`);
        });
    }

    handleChange = (e) => {
        this.setState({ msg: e.target.value });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.msg);
        socket.emit('message',{
            user: this.state.nickname, 
            msg: this.state.msg
        });
    }

    render(){
        return(
            <div id="container">
                <div id="window">
                    <div id="messages"></div>
                    <div id="actions"></div>
                </div>
                <div id="bar">
                    <input type="text" id="message" onChange={this.handleChange} placeholder="Mensaje"/>
                    <button id="send" onClick={ this.handleSubmit }>Enviar</button>
                </div>
            </div>
        );
    }

}

export default Chat;