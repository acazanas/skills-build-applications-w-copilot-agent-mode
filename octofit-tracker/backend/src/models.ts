import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  team: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  createdAt: { type: Date, default: () => new Date() },
});

export const User = model<UserDocument>('User', userSchema);

export interface TeamDocument extends mongoose.Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Team = model<TeamDocument>('Team', teamSchema);

export interface ActivityDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Activity = model<ActivityDocument>('Activity', activitySchema);

export interface LeaderboardDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  rank: number;
  points: number;
  metric: string;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  metric: { type: String, required: true },
});

export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export interface WorkoutDocument extends mongoose.Document {
  name: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
});

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
