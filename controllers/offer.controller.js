const Offer = require('../models/offer');

exports.getOffers = (req, res, next) => {
  Offer.find({
    geometry: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [29.003906249999996, 30.6662659463233]
        },
        $minDistance: 6000,
        $maxDistance: 5000
      }
    }
  })
    .then(offers => {
      res.status(200).json(offers);
    })
    .catch(err => {
      next(err);
    });
};

// GET BY ID
exports.getById = (req, res, next) => {
  const { id } = req.params;
  Offer.findById(id)
    .then(offer => {
      res.status(200).json(offer);
    })
    .catch(err => {
      next(err);
    });
};

// ADD OFFER
exports.postNewOffer = (req, res, next) => {
  const {
    title,
    brand,
    description,
    price,
    oldPrice,
    userId,
    geometry
  } = req.body;
  const newOffer = new Offer({
    title,
    description,
    price,
    oldPrice,
    userId,
    brand,
    geometry
  });
  newOffer
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
};
