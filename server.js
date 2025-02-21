import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import AdminRoutes from './routes/AdminRoutes.js';
import SubscriberRoutes from './routes/SubscriberRoutes.js';
import CityRoutes from './routes/CityRoutes.js';
import CallRoutes from './routes/CallRoutes.js';

dotenv.config();

const port = process.env.PORT || 4444;

mongoose
  .connect(process.env.MONGO__URL)
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', AdminRoutes);
app.use('/subscribers', SubscriberRoutes);
app.use('/cities', CityRoutes);
app.use('/calls', CallRoutes);

app.listen(port || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});
