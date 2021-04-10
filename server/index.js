import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/posts.js';

const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
import dotenv from 'dotenv';

dotenv.config();

const { CONNECTION_URL } = process.env;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected...'))
  .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);

/* Utilize the routes */
app.use('/posts', routes);

/* Greeting */
app.get('/', (req, res) => {
  res.send('Welcome to memories API');
});

app.listen(PORT, () => console.log('Server running on port ', PORT));
