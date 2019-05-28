const Offer = require('../models/offer');

exports.getOffers = (req, res, next) => {
  Offer.find()
    .sort({ createdAt: -1 })
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
    .populate('userId', ['name', 'email', 'phone', 'brandName'])
    .then(offer => {
      res.status(200).json(offer);
    })
    .catch(err => {
      next(err);
    });
};

// search on database
exports.postSearch = (req, res, next) => {
  const { term } = req.query;

  Offer.find({ $text: { $search: term } }, { score: { $meta: 'textScore' } })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => next(err));
};

exports.deleteOffer = (req, res, next) => {
  const { id } = req.params;
  Offer.findByIdAndDelete(id)
    .then(result => {
      res.json(result);
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
    location,
    userId,
    geometry,
    dueDate
  } = req.body;
  const newOffer = new Offer({
    title,
    description,
    price,
    oldPrice,
    userId,
    brand,
    location,
    geometry,
    dueDate
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
