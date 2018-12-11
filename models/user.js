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
  country: String,
  skillRating: [Number],
  hostRating: [Number],
  chillRating: [Number],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
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
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/burnley_fc_logo.png';
        break;
      case 'Cardiff City':
        clubLogo = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Cardiff_City_crest.svg/1200px-Cardiff_City_crest.svg.png';
        break;
      case 'Chelsea':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/chelsea_fc_logo.png';
        break;
      case 'Crystal Palace':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/crystal_palace_fc_logo.jpg';
        break;
      case 'Everton':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/everton.png';
        break;
      case 'Fulham':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2018/08/fulham_fc_colors-768x1024.png';
        break;
      case 'Huddersfield Town':
        clubLogo = 'https://vignette.wikia.nocookie.net/logopedia/images/b/b5/Huddersfield_Town_FC_logo_%28simple%29.png/revision/latest?cb=20120314135832';
        break;
      case 'Leicester City':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/leicester_city_fc_colors.png';
        break;
      case 'Liverpool':
        clubLogo = 'https://upload.wikimedia.org/wikipedia/hif/b/bd/Liverpool_FC.png';
        break;
      case 'Manchester City':
        clubLogo = 'https://upload.wikimedia.org/wikipedia/sco/thumb/e/eb/Manchester_City_FC_badge.svg/410px-Manchester_City_FC_badge.svg.png';
        break;
      case 'Manchester United':
        clubLogo = 'http://pngimg.com/uploads/manchester_united/manchester_united_PNG20.png';
        break;
      case 'Newcastle United':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/newcastle_united_fc_crest-768x773.png';
        break;
      case 'Southampton':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/southhampton_fc.png';
        break;
      case 'Tottenham Hotspur':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/tottenham_hotspur_logo.png';
        break;
      case 'Watford':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/11/watford.png';
        break;
      case 'West Ham United':
        clubLogo = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/185px-West_Ham_United_FC_logo.svg.png';
        break;
      case 'Wolverhampton':
        clubLogo = 'https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2018/08/wolves-logo.png';
        break;
      case 'NONE OF THE ABOVE':
        clubLogo = 'http://pngimg.com/uploads/football/football_PNG52789.png';
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

userSchema.virtual('matches', {
  ref: 'Match',
  localField: '_id',
  foreignField: 'attending'
});

userSchema.virtual('hosting', {
  ref: 'Match',
  localField: '_id',
  foreignField: 'hostedBy'
});

userSchema.virtual('averageSkill')
  .get(function() {
    const avg = this.skillRating.reduce((sum, rating) => {
      return sum + rating;
    }, 0) / this.skillRating.length;

    return avg.toFixed(1);
  });
userSchema.virtual('averageChill')
  .get(function() {
    const avg = this.chillRating.reduce((sum, rating) => {
      return sum + rating;
    }, 0) / this.chillRating.length;

    return avg.toFixed(1);
  });
userSchema.virtual('averageHost')
  .get(function() {
    const avg = this.hostRating.reduce((sum, rating) => {
      return sum + rating;
    }, 0) / this.hostRating.length;

    return avg.toFixed(1);
  });


userSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', userSchema);
