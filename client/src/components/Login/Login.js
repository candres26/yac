import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

class Login extends Component  {
    constructor(props){
        super();
        this.state = {
            name: '',
            room: ''
        };
    }

    updateNickname(e){
        this.setState({ name: e.target.value });
    }

    updateRoom(e){
        this.setState({ room: e.target.value });
    }

    render(){
        return(
            <div className="containerLogin">
                <div className="wrapperLogin">
                    <h1 className="heading">Únete</h1>
                    <div><input type="text" placeholder="Usuario"name="name" onChange={ this.updateNickname.bind(this) } /></div>
                    <div><input type="text" placeholder="Sala" name="room" onChange={this.updateRoom.bind(this)} /></div>
                    <Link onClick={event => (!this.state.name || !this.state.room) ? event.preventDefault() : null } to={`/chat?name=${this.state.name}&room=${this.state.room}`}>
                        <button className="button" type="submit" >Entrar</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;