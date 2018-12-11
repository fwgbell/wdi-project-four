import React from 'react';
import moment from 'moment';
import { decodeToken } from '../../lib/auth';


function Conversation({ userId, messages }) {
  const filtered = messages && messages.filter(message =>
    message.from._id === userId || message.to._id === userId
  );
  console.log('filtered is', filtered);
  return (
    <div>
      {filtered && filtered.map(message =>
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
              <strong>{message.from.username} </strong>
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
