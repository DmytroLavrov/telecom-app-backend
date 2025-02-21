import express from 'express';

const port = 4444;

const app = express();

app.use(express.json());

app.listen(port || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});
