import { tokenUserId } from './auth';

export function messagesPerUser(messageData) {
  const result = {};
  const currentUserId = tokenUserId();
  messageData.forEach(message => {
    // Get the user which is not me, either from or to
    let otherUser = message.to;
    if (otherUser._id === currentUserId) {
      otherUser = message.from;
    }
    // Has our result object already seen this user?
    if (result.hasOwnProperty(otherUser._id)) {
      // If so, add one to the count
      result[otherUser._id].count = result[otherUser._id].count + 1;
    } else {
      // If not, set the count to 1
      result[otherUser._id] = { user: otherUser, count: 1 };
    }
  });
  return result;
}
