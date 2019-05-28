const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/userOffers/:id', userController.getUserOffers);

router.get('/userData/:id', userController.getUserData);

module.exports = router;
