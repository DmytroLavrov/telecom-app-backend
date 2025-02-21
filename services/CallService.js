import CallModel from '../models/Call.js';
import SubscriberModel from '../models/Subscriber.js';
import CityModel from '../models/City.js';

const calculateCallCost = async (cityId, duration, timeOfDay) => {
  const city = await CityModel.findById(cityId);

  if (!city) {
    throw new Error('City not found');
  }

  let ratePerMinute = timeOfDay === 'day' ? city.dayRate : city.nightRate;
  ratePerMinute *= 100;

  let durationInMinutes = duration / 60;
  let cost = durationInMinutes * ratePerMinute;

  const discount = city.discounts.find((d) => durationInMinutes >= d.duration);
  if (discount) {
    cost *= 1 - discount.discountRate;
  }

  return cost;
};

export const fetchAllCalls = async () => {
  const calls = await CallModel.find()
    .populate({
      path: 'subscriber',
      select: 'phoneNumber',
      strictPopulate: false,
    })
    .populate({ path: 'city', select: 'name', strictPopulate: false })
    .select('date duration timeOfDay cost subscriber city')
    .lean();

  return calls
    .filter((call) => call.subscriber && call.city)
    .map((call) => ({
      _id: call._id,
      subscriber: call.subscriber.phoneNumber,
      city: call.city.name,
      date: call.date,
      duration: call.duration,
      timeOfDay: call.timeOfDay,
      cost: call.cost,
    }));
};

export const createCall = async (callData) => {
  const { subscriber, city, duration, date } = callData;

  const existingSubscriber = await SubscriberModel.findById(subscriber);
  if (!existingSubscriber) {
    throw new Error('Subscriber not found');
  }

  const existingCity = await CityModel.findById(city);
  if (!existingCity) {
    throw new Error('City not found');
  }

  const callDate = date ? new Date(date) : new Date();
  const hours = callDate.getHours();
  const timeOfDay = hours >= 8 && hours < 22 ? 'day' : 'night';

  const cost = await calculateCallCost(city, duration, timeOfDay);

  const newCall = new CallModel({
    subscriber,
    city,
    date: callDate,
    duration,
    timeOfDay,
    cost,
  });

  await newCall.save();
  return newCall;
};

export const removeCall = async (callId) => {
  const deletedCall = await CallModel.findByIdAndDelete(callId);
  return deletedCall;
};
