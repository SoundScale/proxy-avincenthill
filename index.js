require('dotenv').config();
require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const axios = require('axios');
const compression = require('compression')
const port = 1338;

const app = express();
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use('/songs/:id', express.static('public'));

app.get('/api/waveformplayer/:id', (req, res) => {
  console.log("proxy server sent a GET request to /api/waveformplayer/:id");
  axios(`http://sdclb-2122289528.us-west-1.elb.amazonaws.com/api/waveformplayer/${req.params.id}`)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
});

// app.get('/relatedTracks/:id', (req, res) => {
//   // res.send(req.params.id)
//   const songId = req.params.id;
//   axios.get(`http://18.219.127.175/relatedTracks/${songId}`)
//     .then(({ data }) => {
//       console.log('Related Tracks', data);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/relatedAlbums/:id', (req, res) => {
//   const songId = req.params.id;
//   axios.get(`http://18.219.127.175/relatedAlbums/${songId}`)
//     .then(({ data }) => {
//       console.log('Related Albums', data);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/api/stats/:id', (req, res) => {
//   axios.get(`http://server-env-1.phjpybupp3.us-west-1.elasticbeanstalk.com/api/stats/${req.params.id}`)
//     .then(({ data }) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// })

// app.get('/api/comments/:id', (req, res) => {
//   // console.log(`http:/localhost:3001/api/${req.params.songid}`);
//   axios.get(`http://comments-server.2u82f9p8mx.us-east-2.elasticbeanstalk.com/api/comments/${req.params.id}`)
//     .then(function (response) {
//       res.send(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

app.listen(port, () => {
  console.log(`avincenthill proxy server listening at ${port}...`);
});