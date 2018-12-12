import React from 'react';
import moment from 'moment';
import { decodeToken } from '../../lib/auth';
import { Link } from 'react-router-dom';


function Conversation({ userId, messages, newThread, users, handleChange }) {
  const filtered = messages && messages.filter(message =>
    message.from._id === userId || message.to._id === userId
  );
  return (
    <div>
      {newThread && <div>
        <div className="field">
          <label className="label">Who would you like to message?</label>
          <div className="control">
            <div className="select">
              <select name="conversationUserId" onChange={handleChange} value={userId || ''} required>
                <option>Please Select</option>
                {
                  users.map(user =>
                    user._id !== decodeToken().sub && <option key={user._id} value={user._id}>{user.username}</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>
      </div>}
      {filtered && filtered.map(message =>
        message.matchMessage?
          <div key={message._id} className="matchMessage">
            <p>
              {message.content}
              <br />
              <small>{moment(message.createdAt).fromNow()}</small>
            </p>
          </div>
          :
          message.from._id === decodeToken().sub ?
            <div key={message._id} className="fromUser">
              <p>
                {message.content}
                <br />
                <small>{moment(message.createdAt).fromNow()}</small>
              </p>
            </div>
            :
            <div key={message._id} className="toUser">
              <p>
                <strong><Link to={`/profile/${message.from._id}`}>{message.from.username}</Link></strong>
                {message.content}
                <br />
                <small>{moment(message.createdAt).fromNow()}</small>
              </p>
            </div>
      )}
    </div>
  );
}

export default Conversation;
