import React from 'react';
import moment from 'moment';

function Conversation({ userId, messages }) {
  const filtered = messages && messages.filter(message =>
    message.from._id === userId || message.to._id === userId
  );
  console.log('filtered is', filtered);
  return (
    <div>
      {filtered && filtered.map(message =>
        <div key={message._id} className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={message.from.profilePicture}/>
            </figure>
          </div>
          <p>
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
