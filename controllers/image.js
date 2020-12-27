const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '544825159969435482a7dd3da73d4c78'
});

const handleApiCall = (req, res) => {
  app.models
    // 'c0c0ac362b03416da06ab3fa36fb58e3'
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}