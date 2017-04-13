const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { router: usersRouter } = require('./users');
mongoose.Promise = global.Promise;

try {
  require('dotenv').config();
} catch (error) {
  console.warn('unable to load .env');
}

const { PORT, DATABASE_URL } = require('./config');
console.log('DATABASE_URL: ', DATABASE_URL);
const { HighestScore } = require('./models');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));
app.use('/users/', usersRouter);

//app.use(express.static('dist/bundle.js'));
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/highestScore', (req, res) => {
  HighestScore.find()
    .exec()
    .then(highestScore => {
      res.json({
        result: highestScore.map(highestScore => highestScore.apiRepr()),
      });
    })
    .catch(err => {
      console.log(16, err);
      res.status(500).json({ message: 'Interval server error' });
    });
});

app.put('/highestScore', (req, res) => {
  HighestScore.findByIdAndUpdate('58e70d40734d1d4af38c960d', req.body)
    .exec()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(16, err);
      res.status(500).json({ message: 'Interval server error' });
    });
});

//check and update game highest score
app.put('/highestScore/:score', (req, res) => {
  HighestScore.find()
    .exec()
    .then(data => {
      const oldScore = data[0].highestScore;
      console.log(1, oldScore, 2, req.params.score);
      const reqBody = req.body;
      reqBody.highestScore = req.params.score;
      if (req.params.score > oldScore) {
        HighestScore.findByIdAndUpdate('58e70d40734d1d4af38c960d', reqBody)
          .exec()
          .then(data => {
            res.json(200);
          })
          .catch(err => {
            console.log(16, err);
            res.status(500).json({ message: 'Interval server error' });
          });
      } else {
        res.json(400);
      }
    })
    .catch(err => {
      console.log(16, err);
      res.status(500).json({ message: 'Interval server error' });
    });
});

app.use('*', function(req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
