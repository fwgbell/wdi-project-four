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
  club: {
    type: String, required: true,
    enum: [
      'AFC Bournemouth', 'Arsenal', 'Brighton & Hove Albion',
      'Burnley', 'Cardiff City', 'Chelsea',
      'Crystal Palace', 'Everton', 'Fulham',
      'Huddersfield Town', 'Leicester City', 'Liverpool',
      'Manchester City', 'Manchester United', 'Newcastle United',
      'Southampton', 'Tottenham Hotspur', 'Watford',
      'West Ham United', 'Wolverhampton', 'NONE OF THE ABOVE'
    ]},
  country: String
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.virtual('clubLogo')
  .get(function(){
    let clubLogo = '';
    switch(this.club){
      case 'Arsenal':
        clubLogo = 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4df.png';
        break;
    }
    return clubLogo;
  });

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', userSchema);
