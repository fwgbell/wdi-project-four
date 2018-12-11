import React from 'react';
import { messagesPerUser } from '../../lib/messages';

function Sidebar({ messages, handleClick }) {
  const messageCounts = messages && messagesPerUser(messages);
  return (
    <div>
      {messages && Object.keys(messageCounts).map(userId =>
        <div key={userId} onClick={() => handleClick(userId)}>
          <p>{messageCounts[userId].user.username} - ({messageCounts[userId].count})</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
