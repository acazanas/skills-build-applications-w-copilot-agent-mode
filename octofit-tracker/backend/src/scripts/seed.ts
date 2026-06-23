import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(connectionString);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Ramirez', email: 'ava@octofit.app', role: 'member' },
    { name: 'Noah Lee', email: 'noah@octofit.app', role: 'captain' },
    { name: 'Mia Patel', email: 'mia@octofit.app', role: 'member' },
  ]);

  const teams = await Team.create([
    { name: 'Runners United', description: 'A motivated team focused on running goals.' },
    { name: 'Strength Squad', description: 'Powerlifting and functional strength stars.' },
  ]);

  teams[0].members.push(users[0]._id, users[2]._id);
  teams[1].members.push(users[1]._id);
  await Promise.all(teams.map((team) => team.save()));

  await Promise.all([
    User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id }),
    User.findByIdAndUpdate(users[2]._id, { team: teams[0]._id }),
    User.findByIdAndUpdate(users[1]._id, { team: teams[1]._id }),
  ]);

  await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 42,
      distanceKm: 8.4,
      calories: 520,
      date: new Date('2026-06-20T07:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Strength',
      durationMinutes: 55,
      calories: 650,
      date: new Date('2026-06-21T18:00:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 35,
      calories: 190,
      date: new Date('2026-06-21T06:45:00Z'),
    },
  ]);

  await Leaderboard.create([
    { user: users[1]._id, rank: 1, points: 1840, metric: 'weekly points' },
    { user: users[0]._id, rank: 2, points: 1725, metric: 'weekly points' },
    { user: users[2]._id, rank: 3, points: 1500, metric: 'weekly points' },
  ]);

  await Workout.create([
    {
      name: 'Morning Energizer',
      description: 'A quick full-body routine to kickstart the day.',
      difficulty: 'Beginner',
      durationMinutes: 25,
      exercises: ['Jumping jacks', 'Bodyweight squats', 'Plank hold', 'Mountain climbers'],
    },
    {
      name: 'Strength Builder',
      description: 'A strength-focused workout for muscle endurance.',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      exercises: ['Dumbbell deadlift', 'Push-ups', 'Lunges', 'Russian twists'],
    },
    {
      name: 'Recovery Flow',
      description: 'Mobility and stretch routine for recovery days.',
      difficulty: 'Easy',
      durationMinutes: 30,
      exercises: ['Cat-cow stretch', 'Hip openers', 'Hamstring stretch', 'Child pose'],
    },
  ]);

  console.log('Seed data created successfully.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});
