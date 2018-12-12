import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import Compose from './Compose';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newThread: false
    };
    this.chooseConversation = this.chooseConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.newThread = this.newThread.bind(this);
  }

  newThread(){
    axios.get('/api/users', authorizationHeader())
      .then(result => this.setState({ users: result.data, newThread: true, conversationUserId: '' }));
  }

  chooseConversation(userId) {
    this.setState({ conversationUserId: userId, active: event.target.id });
  }

  createMessage() {
    if(!this.state.conversationUserId || !this.state.newMessage) return;
    axios.post('/api/messages', {
      to: this.state.conversationUserId,
      content: this.state.newMessage
    }, authorizationHeader())
      .then(result => this.setState({ messages: this.state.messages.concat(result.data), newMessage: '', newThread: false }));
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
      <div className="messagesPage">
        <h1 className="title is-2">Messages</h1>
        <div className="message-container">
          <div className="sidebar">
            <Sidebar active={this.state.active} messages={this.state.messages} newThread={this.newThread} handleClick={this.chooseConversation}/>
          </div>
          <div className="messages-main">
            <div className="conversation">
              <Conversation users={this.state.users} handleChange={this.handleChange} userId={this.state.conversationUserId} messages={this.state.messages} newThread={this.state.newThread}/>
            </div>
            <div className="compose">
              <Compose newMessage={this.state.newMessage || ''} handleClick={this.createMessage} handleChange={this.handleChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
