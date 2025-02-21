import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dayRate: {
    type: Number,
    required: true,
  },
  nightRate: {
    type: Number,
    required: true,
  },
  discounts: [
    {
      duration: {
        type: Number,
        required: true,
      },
      discountRate: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CityModel = mongoose.model('City', citySchema);
export default CityModel;
