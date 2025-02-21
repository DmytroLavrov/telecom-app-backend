import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscriber',
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  timeOfDay: {
    type: String,
    enum: ['day', 'night'],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const CallModel = mongoose.model('Call', callSchema);
export default CallModel;
