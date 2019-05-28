const Offers = require('../models/offer');
const User = require('../models/user');
exports.getUserOffers = (req, res, next) => {
  const { id } = req.params;
  Offers.find({ userId: id })
    .populate('userId', 'name')
    .then(offers => {
      res.status(200).json(offers);
    })
    .catch(err => {
      next(err);
    });
};

exports.getUserData = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    });
};
