const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  hostedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  time: Date,
  endTime: Date,
  type: { type: String, enum: ['Kick-About', 'Headers and Volleys', 'League Match'] },
  pitch: { type: mongoose.Schema.ObjectId, ref: 'Pitch' },
  attending: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Pitch', pitchSchema);
