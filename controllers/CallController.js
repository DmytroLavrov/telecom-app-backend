import {
  fetchAllCalls,
  createCall,
  removeCall,
} from '../services/CallService.js';

export const getCalls = async (req, res) => {
  try {
    const calls = await fetchAllCalls();
    res.json(calls);
  } catch (err) {
    console.error('Error fetching calls:', err.message);
    res.status(500).json({
      message: 'Failed to fetch the call list. Please try again',
    });
  }
};

export const addNewCall = async (req, res) => {
  try {
    const newCall = await createCall(req.body);
    res.json(newCall);
  } catch (err) {
    console.error(err.message);

    if (
      err.message === 'Subscriber not found' ||
      err.message === 'City not found'
    ) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({
      message: 'Failed to add the call to the list. Please try again',
    });
  }
};

export const deleteCall = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCall = await removeCall(id);

    if (!deletedCall) {
      return res.status(404).json({ message: 'Call not found' });
    }

    res.json({ message: 'Call successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Failed to delete the call. Please try again',
    });
  }
};
