const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  bio: String,
  role1: { type: String, enum: ['Striker', 'Top Man', 'Winger', 'Midfielder', 'Utility Player', 'Last Man', 'Goalkeeper', 'Defender', '💦Water Boy💦' ], required: true},
  role2: { type: String, enum: ['Striker', 'Top Man', 'Winger', 'Midfielder', 'Utility Player', 'Last Man', 'Goalkeeper', 'Defender', '💦Water Boy💦' ]},
  role3: { type: String, enum: ['Striker', 'Top Man', 'Winger', 'Midfielder', 'Utility Player', 'Last Man', 'Goalkeeper', 'Defender', '💦Water Boy💦' ]},
  club: {
    type: String,
    enum: [
      'AFC Bournemouth', 'Arsenal', 'Brighton & Hove Albion',
      'Burnley', 'Cardiff City', 'Chelsea',
      'Crystal Palace', 'Everton', 'Fulham',
      'Huddersfield Town', 'Leicester City', 'Liverpool',
      'Manchester City', 'Manchester United', 'Newcastle United',
      'Southampton', 'Tottenham Hotspur', 'Watford',
      'West Ham United', 'Wolverhampton', 'None of the above'
    ]}
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
