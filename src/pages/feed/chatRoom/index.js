import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { compose } from 'redux';
import io from 'socket.io-client';

import './style.css';
import { translate } from '../../../utils/utils';

class ChatRoom extends Component {
  state = {

  }

  componentDidMount() {
    const socket = io('http://localhost:6060');
    socket.on("message", data => {
      if (data.action === "test") {
        console.log("radi", data.message)
      }
    })
  }

  render() {
    return (
      <div className="chat-room">
        <div className="chat">

        </div>
        <div className="actions">
          <input type="text"  />
          <button>Send</button>
        </div>
      </div>
    )
  }
}

export default ChatRoom;