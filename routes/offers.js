const router = require('express').Router();

const offerController = require('../controllers/offer.controller');

router.get('/offers', offerController.getOffers);

router.get('/offer/:id', offerController.getById);

router.post('/addOffer', offerController.postNewOffer);

router.get('/search', offerController.postSearch);

router.delete('/deleteOffer/:id', offerController.deleteOffer);

module.exports = router;
