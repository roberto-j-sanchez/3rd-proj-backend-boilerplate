const express = require('express');
const router = express.Router();

const Phone = require('../models/phone-model');

// .post() => save new phone to the DB
router.post('/phones', (req, res, next) => {
  const { brand, model, price, image, specs } = req.body;

  if (brand == '' || model == '' || price == '', image == '', specs == '') {
    // send error JSON if any of the fields is empty or password doesn't contain a number
    res.status(401).json({ message: 'All fields need to be filled.' });
    return;
  }

  Phone.create({ brand, model, price, image, specs })
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

// .get() => get the list of phones from the DB
router.get('/phones', (req, res, next) => {
  Phone.find()
  .sort({ createdAt: -1 })
  .limit(10)
  // send the received results from the DB as JSON to the client
  .then( phonesFromDB => res.json(phonesFromDB) )
  .catch( err => next(err) );
})

module.exports = router;
