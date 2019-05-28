const User = require('../models/user');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGN UP
exports.postSignup = (req, res, next) => {
  const { name, email, password, phone, isBrand, brandName } = req.body;
  User.findOne({ email: email, phone: phone })
    .then(user => {
      if (user) {
        const error = new Error('user is already exisist ');
        error.statusCode = 401;
        throw error;
      }
      bcript
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            password: hashedPassword,
            email: email,
            phone: phone,
            isBrand: isBrand,
            brandName: brandName
          });
          return user.save();
        })
        .then(result => {
          const token = jwt.sign(
            {
              userId: result._id
            },
            'supersecretkey'
          );
          res.status(200).json({
            token: token,
            userId: result._id,
            isBrand: result.isBrand
          });
        });
    })
    .catch(err => {
      next(err);
    });
};

// LOGIN
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('user is  not exist');
        error.statusCode = 401;
        throw error;
      }
      bcript
        .compare(password, user.password)
        .then(doMatch => {
          if (!doMatch) {
            const error = new Error('password is not correct');
            error.statusCode = 401;
            throw error;
          }
          const token = jwt.sign(
            {
              id: user._id
            },
            'supersecretkey'
          );
          res.status(200).json({
            token: token,
            userId: user._id
          });
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(error => {
      next(error);
    });
};
