const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: String
}, { timestamps: true });

messageSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model('Message', messageSchema);
