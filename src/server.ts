import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit("db ready");
  })
  .catch((e) => console.log(e));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.on("db ready", () => {
  app.listen(3333),
    () => {
      console.log("Connected");
    };
});
