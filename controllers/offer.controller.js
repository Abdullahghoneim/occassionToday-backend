const Offer = require('../models/offer');

exports.getOffers = (req, res, next) => {
  Offer.find({})
    .select(['title', 'price', 'oldPrice'])
    .limit(10)
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
  const { title, brand, description, price, oldPrice, userId } = req.body;
  const newOffer = new Offer({
    title,
    description,
    price,
    oldPrice,
    userId,
    brand
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
