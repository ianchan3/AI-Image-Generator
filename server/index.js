import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import database from './config/database.js';
import { router as postRouter} from './routes/post.js';
import { router as dalleRouter} from './routes/dalle.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRouter)
app.use('/api/v1/dalle', dalleRouter)

app.get('/', async (req, res) => {
  res.send("Hello from DALL-E!")
})

const startServer = async () => {
  try {
    database(process.env.MONGODB_URL)
    app.listen(8080, () => console.log('Server has started on port 8080'))
  } catch (error) {
    console.log(error)
  }
}

startServer();