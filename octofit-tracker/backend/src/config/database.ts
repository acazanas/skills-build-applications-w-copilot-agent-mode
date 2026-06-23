import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}`);
}

export default connectDatabase;
