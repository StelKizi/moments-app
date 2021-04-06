import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/posts.js';

const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL =
  'mongodb+srv://stella-admin:rrMjWMGUdtF0xGZi@cluster0.wkvqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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

app.listen(PORT, () => console.log('Server running on port ', PORT));
