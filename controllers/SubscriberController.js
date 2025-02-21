import {
  fetchAllSubscribers,
  fetchSubscriberDetailsById,
  createSubscriber,
  updateSubscriberById,
  deleteSubscriberById,
} from '../services/SubscriberService.js';

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await fetchAllSubscribers();
    res.json(subscribers);
  } catch (err) {
    console.error('Error fetching subscribers:', err.message);
    res.status(500).json({
      message: 'Failed to fetch the subscriber list. Please try again',
    });
  }
};

export const getSubscriberDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriberDetails = await fetchSubscriberDetailsById(id);
    res.json(subscriberDetails);
  } catch (err) {
    console.error('Error fetching subscriber details:', err.message);
    res.status(404).json({ message: err.message });
  }
};

export const addSubscriber = async (req, res) => {
  try {
    const newSubscriber = await createSubscriber(req.body);
    res.status(201).json(newSubscriber);
  } catch (err) {
    console.error('Error adding subscriber:', err.message);
    res.status(400).json({ message: err.message });
  }
};

export const updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubscriber = await updateSubscriberById(id, req.body);
    res.json(updatedSubscriber);
  } catch (err) {
    console.error('Error updating subscriber:', err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSubscriberById(id);
    res.json({ message: 'Subscriber successfully deleted' });
  } catch (err) {
    console.error('Error deleting subscriber:', err.message);
    res.status(404).json({ message: err.message });
  }
};
