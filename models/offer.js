const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number]
  }
});

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    oldPrice: {
      type: Number,
      required: true
    },
    location: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: {
      type: String
    },
    dueDate: {
      type: Schema.Types.Date
    },
    geometry: GeoSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offers', offerSchema);
