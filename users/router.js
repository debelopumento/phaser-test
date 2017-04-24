const express = require('express');
const jsonParser = require('body-parser').json();

const { User } = require('./models');

const router = express.Router();

router.use(jsonParser);

//create a new user in db
router.post('/', (req, res) => {
  if (!('screenName' in req.body)) {
    res.status(422).json({ message: 'Missing field: screenName' });
  }
  let { screenName, facebookId } = req.body;
  console.log(31, req.body);
  screenName = screenName.trim();
  if (screenName === '') {
    res.status(422).json({ message: 'Incorrect field length: screenName' });
  }
  // check for existing user
  User.find({ screenName: screenName })
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        res.status(422).json({ message: 'screenName already taken' });
      }
    })
    .then(() => {
      const newUser = {
        screenName: screenName,
        facebookId: facebookId,
        highestScore: 0,
      };
      User.create(newUser).then(user => {
        res.json(user.apiRepr());
      });
    })
    .catch(err => {
      res.json({ message: 'Internal server error' });
    });
});

//get all users
router.get('/', (req, res) => {
  console.log(11);
  User.find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//look for a user by Id
router.get('/userId/:id', (req, res) => {
  User.findById(req.params.id)
    .exec()
    .then(user => res.json(user.apiRepr()))
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

//look for a user by facebookId
router.get('/facebookId/:facebookId', (req, res) => {
  User.find({ facebookId: req.params.facebookId })
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//look for a user by facebookId and update
router.put('/userUpdate2/:facebookId/:score', (req, res) => {
  User.find({ facebookId: req.params.facebookId })
    .exec()
    .then(users => {
      console.log(90, users);
      User.findByIdAndUpdate('', {
        highestScore: req.params.score,
      })
        .exec()
        .then(user => {
          res.json(user.apiRepr());
        })
        .catch(err =>
          res.status(500).json({ message: 'Internal server error' }));
    })
    .catch(err => res.json({ message: 'Internal server error' }));
});

//update user highest score
router.put('/updateUserHighestScore/:id/:score', (req, res) => {
  const reqBody = {
    highestScore: req.params.score,
  };
  User.findByIdAndUpdate(req.params.id, reqBody)
    .exec()
    .then(user => {
      user.highestScore = req.params.score;
      res.json(user.apiRepr());
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//update user info
router.put('/userUpdate/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };
