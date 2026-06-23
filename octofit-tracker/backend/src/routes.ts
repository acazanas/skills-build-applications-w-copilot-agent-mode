import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

export const apiRouter = Router();

apiRouter.get('/users', async (_req, res) => {
  const users = await User.find().populate('team', 'name description');
  res.json({ endpoint: '/api/users', data: users });
});

apiRouter.get('/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email role');
  res.json({ endpoint: '/api/teams', data: teams });
});

apiRouter.get('/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ endpoint: '/api/activities', data: activities });
});

apiRouter.get('/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('user', 'name');
  res.json({ endpoint: '/api/leaderboard', data: leaderboard });
});

apiRouter.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json({ endpoint: '/api/workouts', data: workouts });
});
