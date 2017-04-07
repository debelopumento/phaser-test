const { BasicStrategy } = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const { User } = require('./models');

const router = express.Router();

router.use(jsonParser);

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'No request body' });
  }

  if (!('screenName' in req.body)) {
    return res.status(422).json({ message: 'Missing field: screenName' });
  }

  let { screenName, facebookId, fullName } = req.body;

  if (typeof screenName !== 'string') {
    return res
      .status(422)
      .json({ message: 'Incorrect field type: screenName' });
  }

  screenName = screenName.trim();

  if (screenName === '') {
    return res
      .status(422)
      .json({ message: 'Incorrect field length: screenName' });
  }

  // check for existing user
  return User.find({ screenName })
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({ message: 'screenName already taken' });
      }
    })
    .then(hash => {
      return User.create({
        screenName: screenName,
        fullName: fullName,
        facebookId: facebookId,
      });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  return User.find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(
      err =>
        console.log(err) &&
        res.status(500).json({ message: 'Internal server error' })
    );
});

router.get('/userId/:id', (req, res) => {
  return User.findById(req.params.id)
    .exec()
    .then(user => res.json(user.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//search for a user by screenName
router.get('/screenName/:screenName', (req, res) => {
  return User.find({ screenName: req.params.screenName })
    .count()
    .exec()
    .then(function(count) {
      if (count === 0) {
        res.json(count);
      } else if (count === 1) {
        return User.findOne({ screenName: req.params.screenName })
          .exec()
          .then(user => res.json(user.apiRepr()))
          .catch(
            err =>
              console.log(err) &&
              res.status(500).json({ message: 'Internal server error' })
          );
      }
    });
});

router.get('/facebookId/:facebookId', (req, res) => {
  return User.find({ facebookId: req.params.facebookId })
    .count()
    .exec()
    .then(count => {
      if (count === 0) {
        res.json(count);
      } else if (count === 1) {
        return User.findOne({ facebookId: req.params.facebookId })
          .exec()
          .then(user => res.json(user.apiRepr()))
          .catch(
            err =>
              console.log(err) &&
              res.status(500).json({ message: 'Internal server error' })
          );
      }
    })
    .catch(
      err =>
        console.log(err) &&
        res.status(500).json({ message: 'Internal server error' })
    );
});

//completely overwrite user info
router.put('/userUpdate/:id', (req, res) => {
  return User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .exec()
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

const basicStrategy = new BasicStrategy(
  function(screenName, password, callback) {
    let user;
    User.findOne({ screenName: screenName })
      .exec()
      .then(_user => {
        user = _user;
        if (!user) {
          return callback(null, false, { message: 'Incorrect screenName' });
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        if (!isValid) {
          return callback(null, false, { message: 'Incorrect password' });
        } else {
          return callback(null, user);
        }
      });
  }
);

passport.use(basicStrategy);
router.use(passport.initialize());

router.get(
  '/me',
  passport.authenticate('basic', { session: false }),
  (req, res) => res.json({ user: req.user.apiRepr() })
);

module.exports = { router };
