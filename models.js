const mongoose = require('mongoose');

const highestScoreSchema = mongoose.Schema({
  highestScore: { type: Number, required: true },
  facebookId: String,
  screenName: String,
});

highestScoreSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    highestScore: this.highestScore,
    facebookId: this.facebookId,
    screenName: this.screenName,
  };
};

const HighestScore = mongoose.model(
  'HighestScore',
  highestScoreSchema,
  'highestScore'
);

module.exports = { HighestScore };
