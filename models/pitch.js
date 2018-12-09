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
    content: { type: String, required: 'This field is required' },
    time: { type: Date, default: Date.now }
  }]
});

pitchSchema.virtual('matches', {
  ref: 'Match',
  localField: '_id',
  foreignField: 'pitch'
});


pitchSchema.virtual('averageRating')
  .get(function() {
    return Math.round(this.reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / this.reviews.length);
  });

pitchSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pitch', pitchSchema);
