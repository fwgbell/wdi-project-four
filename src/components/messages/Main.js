import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import Compose from './Compose';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chooseConversation = this.chooseConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  chooseConversation(userId) {
    this.setState({ conversationUserId: userId });
  }

  createMessage() {
    axios.post('/api/messages', {
      to: this.state.conversationUserId,
      content: this.state.newMessage
    }, authorizationHeader())
      .then(result => this.setState({ messages: this.state.messages.concat(result.data) }));
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }

  componentDidMount() {
    axios.get('/api/messages', authorizationHeader())
      .then(result => this.setState({ messages: result.data }));
  }

  render() {
    return(
      <main>
        <h1 className="title is-2">Messages</h1>
        <div className="message-container">
          <div className="sidebar">
            <Sidebar messages={this.state.messages} handleClick={this.chooseConversation}/>
          </div>
          <div className="messages-main">
            <div className="conversation">
              <Conversation userId={this.state.conversationUserId} messages={this.state.messages}/>
            </div>
            <div className="compose">
              <Compose newMessage={this.state.newMessage || ''} handleClick={this.createMessage} handleChange={this.handleChange} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Messages;
