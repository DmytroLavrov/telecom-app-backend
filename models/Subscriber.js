import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  edrpou: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);
export default SubscriberModel;
