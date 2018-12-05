const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  uploadedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: { type: String, required: 'This field is required' },
  lat: Number,
  lng: Number,
  image: String,
  reviews: [{
    title: { type: String, required: 'This field is required' },
    reviewedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    rating: { type: Number, required: 'This field is required' },
    content: { type: String, required: 'This field is required' }
  }]
});

module.exports = mongoose.model('Pitch', pitchSchema);
