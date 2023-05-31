import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/router.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const DBURI =
  process.env.DB_URL || 'mongodb+srv://User:User@cluster0.aiauka7.mongodb.net/';

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

// app.get('/', (req, res) => {
//   res.json('Hello to my app');
// });

// app.post('/signup', (req, res) => {
//   const client = new MongoClient(uti);
// });

// app.get('/users', async (req, res) => {
//   const client = new MongoClient(uti);

//   try {
//     await client.connect();
//     const dataBase = client.db();
//   } finally {
//     await client.close();
//   }
// });

const start = async () => {
  try {
    await mongoose.connect(DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
