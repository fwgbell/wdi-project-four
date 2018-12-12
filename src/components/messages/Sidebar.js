import React from 'react';
import { messagesPerUser } from '../../lib/messages';

function Sidebar({ messages, handleClick, newThread, active}) {
  const messageCounts = messages && messagesPerUser(messages);
  return (
    <div>
      <button onClick={newThread} className="button is-rounded"><i className="fas fa-plus-circle"></i></button>
      {messages && Object.keys(messageCounts).map((userId, index) =>
        <div key={userId} onClick={() => handleClick(userId)}>
          <p id={index} className={active === index.toString()? 'active' : null}>{messageCounts[userId].user.username} ({messageCounts[userId].count})</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
