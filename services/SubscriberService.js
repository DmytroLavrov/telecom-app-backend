import SubscriberModel from '../models/Subscriber.js';
import CallModel from '../models/Call.js';

export const fetchAllSubscribers = async () => {
  const subscribers = await SubscriberModel.find().select(
    '_id phoneNumber edrpou address'
  );

  const subscribersWithCallsCount = await Promise.all(
    subscribers.map(async (subscriber) => {
      const callsCount = await CallModel.countDocuments({
        subscriber: subscriber._id,
      });
      return {
        _id: subscriber._id,
        phoneNumber: subscriber.phoneNumber,
        edrpou: subscriber.edrpou,
        address: subscriber.address,
        callsCount,
      };
    })
  );

  return subscribersWithCallsCount;
};

export const fetchSubscriberDetailsById = async (subscriberId) => {
  const subscriber = await SubscriberModel.findById(subscriberId)
    .select('phoneNumber edrpou address')
    .lean();

  if (!subscriber) {
    throw new Error('Subscriber not found');
  }

  const calls = await CallModel.find({ subscriber: subscriberId })
    .populate('city', 'name')
    .select('city duration timeOfDay cost date')
    .lean();

  const formattedCalls = calls
    .filter((call) => call.city)
    .map((call) => ({
      _id: call._id,
      city: call.city.name,
      duration: call.duration,
      timeOfDay: call.timeOfDay,
      cost: call.cost,
      date: call.date,
    }));

  return { subscriber, calls: formattedCalls };
};

export const createSubscriber = async (subscriberData) => {
  const { phoneNumber, edrpou, address } = subscriberData;

  const existingSubscriber = await SubscriberModel.findOne({ phoneNumber });
  if (existingSubscriber) {
    throw new Error('A subscriber with this phone number already exists');
  }

  const newSubscriber = new SubscriberModel({
    phoneNumber,
    edrpou,
    address,
  });

  await newSubscriber.save();
  return newSubscriber;
};

export const updateSubscriberById = async (subscriberId, updateData) => {
  const { phoneNumber, edrpou, address } = updateData;

  const existingSubscriber = await SubscriberModel.findById(subscriberId);
  if (!existingSubscriber) {
    throw new Error('Subscriber not found');
  }

  const existingPhoneNumber = await SubscriberModel.findOne({ phoneNumber });
  if (
    existingPhoneNumber &&
    existingPhoneNumber._id.toString() !== subscriberId
  ) {
    throw new Error('A subscriber with this phone number already exists');
  }

  existingSubscriber.phoneNumber = phoneNumber;
  existingSubscriber.edrpou = edrpou;
  existingSubscriber.address = address;

  await existingSubscriber.save();
  return existingSubscriber;
};

export const deleteSubscriberById = async (subscriberId) => {
  await CallModel.deleteMany({ subscriber: subscriberId });

  const deletedSubscriber = await SubscriberModel.findByIdAndDelete(
    subscriberId
  );
  if (!deletedSubscriber) {
    throw new Error('Subscriber not found');
  }

  return deletedSubscriber;
};
