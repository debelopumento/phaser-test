const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  screenName: {
    type: String,
    required: true,
    unique: true,
  },
  facebookId: {
    type: String,
    required: true,
    unique: true,
  },
  highestScore: Number,
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    facebookId: this.facebookId || '',
    highestScore: this.highestScore || '',
    screenName: this.screenName || '',
  };
};

const User = mongoose.model('User', UserSchema, 'userscollection');

module.exports = { User };
