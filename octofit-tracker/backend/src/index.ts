import mongoose from 'mongoose';
import { createServer } from './server.js';

const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit-tracker';

const app = createServer();

app.listen(port, async () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev` : `http://localhost:${port}`}`);
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
});
