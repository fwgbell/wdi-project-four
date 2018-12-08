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
      case 'AFC Bournemouth':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/afc_bournemouth_logo.png';
        break;
      case 'Arsenal':
        clubLogo = 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4df.png';
        break;
      case 'Brighton & Hove Albion':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/400px-Brighton__Hove_Albion_logo.svg_.png';
        break;
      case 'Burnley':
        clubLogo = '';
        break;
      case 'Cardiff City':
        clubLogo = '';
        break;
      case 'Chelsea':
        clubLogo = '';
        break;
      case 'Crystal Palace':
        clubLogo = '';
        break;
      case 'Everton':
        clubLogo = '';
        break;
      case 'Fulham':
        clubLogo = '';
        break;
      case 'Huddersfield Town':
        clubLogo = '';
        break;
      case 'Leicester City':
        clubLogo = '';
        break;
      case 'Liverpool':
        clubLogo = '';
        break;
      case 'Manchester City':
        clubLogo = '';
        break;
      case 'Manchester United':
        clubLogo = '';
        break;
      case 'Newcastle United':
        clubLogo = '';
        break;
      case 'Southampton':
        clubLogo = '';
        break;
      case 'Tottenham Hotspur':
        clubLogo = '';
        break;
      case 'Watford':
        clubLogo = '';
        break;
      case 'West Ham United':
        clubLogo = '';
        break;
      case 'Wolverhampton':
        clubLogo = '';
        break;
      case 'NONE OF THE ABOVE':
        clubLogo = '';
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
