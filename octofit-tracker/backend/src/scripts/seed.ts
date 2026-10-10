import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  await mongoose.connect(connectionString);

  const userIds = [
    new mongoose.Types.ObjectId('670000000000000000000001'),
    new mongoose.Types.ObjectId('670000000000000000000002'),
    new mongoose.Types.ObjectId('670000000000000000000003'),
    new mongoose.Types.ObjectId('670000000000000000000004'),
  ];
  const teamIds = [
    new mongoose.Types.ObjectId('670000000000000000000011'),
    new mongoose.Types.ObjectId('670000000000000000000012'),
  ];
  const activityIds = [
    new mongoose.Types.ObjectId('670000000000000000000021'),
    new mongoose.Types.ObjectId('670000000000000000000022'),
    new mongoose.Types.ObjectId('670000000000000000000023'),
    new mongoose.Types.ObjectId('670000000000000000000024'),
  ];
  const leaderboardIds = [
    new mongoose.Types.ObjectId('670000000000000000000031'),
    new mongoose.Types.ObjectId('670000000000000000000032'),
    new mongoose.Types.ObjectId('670000000000000000000033'),
    new mongoose.Types.ObjectId('670000000000000000000034'),
  ];
  const workoutIds = [
    new mongoose.Types.ObjectId('670000000000000000000041'),
    new mongoose.Types.ObjectId('670000000000000000000042'),
    new mongoose.Types.ObjectId('670000000000000000000043'),
    new mongoose.Types.ObjectId('670000000000000000000044'),
  ];
  const completedAt = (daysAgo: number): Date =>
    new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

  try {
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({ _id: { $in: userIds } }),
      Team.deleteMany({ _id: { $in: teamIds } }),
      Activity.deleteMany({ _id: { $in: activityIds } }),
      Leaderboard.deleteMany({ _id: { $in: leaderboardIds } }),
      Workout.deleteMany({ _id: { $in: workoutIds } }),
    ]);

    await User.insertMany([
      { _id: userIds[0], username: 'alex_runner', email: 'alex@example.com', displayName: 'Alex Morgan' },
      { _id: userIds[1], username: 'jordan_moves', email: 'jordan@example.com', displayName: 'Jordan Lee' },
      { _id: userIds[2], username: 'sam_cycles', email: 'sam@example.com', displayName: 'Sam Rivera' },
      { _id: userIds[3], username: 'taylor_trains', email: 'taylor@example.com', displayName: 'Taylor Kim' },
    ]);

    await Team.insertMany([
      { _id: teamIds[0], name: 'Trail Blazers', members: [userIds[0], userIds[2]] },
      { _id: teamIds[1], name: 'Morning Miles', members: [userIds[1], userIds[3]] },
    ]);

    await Activity.insertMany([
      {
        _id: activityIds[0],
        user: userIds[0],
        team: teamIds[0],
        activityType: 'Running',
        duration: 42,
        distance: 6.4,
        completedAt: completedAt(1),
      },
      {
        _id: activityIds[1],
        user: userIds[1],
        team: teamIds[1],
        activityType: 'Cycling',
        duration: 55,
        distance: 18.2,
        completedAt: completedAt(2),
      },
      {
        _id: activityIds[2],
        user: userIds[2],
        team: teamIds[0],
        activityType: 'Hiking',
        duration: 70,
        distance: 5.1,
        completedAt: completedAt(3),
      },
      {
        _id: activityIds[3],
        user: userIds[3],
        team: teamIds[1],
        activityType: 'Strength training',
        duration: 35,
        distance: 0,
        completedAt: completedAt(1),
      },
    ]);

    await Leaderboard.insertMany([
      { _id: leaderboardIds[0], user: userIds[0], team: teamIds[0], points: 420, rank: 1 },
      { _id: leaderboardIds[1], user: userIds[1], team: teamIds[1], points: 390, rank: 2 },
      { _id: leaderboardIds[2], user: userIds[2], team: teamIds[0], points: 350, rank: 3 },
      { _id: leaderboardIds[3], user: userIds[3], team: teamIds[1], points: 310, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        _id: workoutIds[0],
        name: 'Easy Endurance Run',
        description: 'A relaxed conversational-pace run to build aerobic endurance.',
        category: 'Running',
        difficulty: 'Beginner',
      },
      {
        _id: workoutIds[1],
        name: 'Tempo Ride',
        description: 'Steady cycling intervals to improve sustained power.',
        category: 'Cycling',
        difficulty: 'Intermediate',
      },
      {
        _id: workoutIds[2],
        name: 'Full-Body Strength',
        description: 'A balanced bodyweight circuit for core and major muscle groups.',
        category: 'Strength',
        difficulty: 'Intermediate',
      },
      {
        _id: workoutIds[3],
        name: 'Recovery Mobility',
        description: 'Gentle mobility work to support recovery and flexibility.',
        category: 'Mobility',
        difficulty: 'Beginner',
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase()
  .then(() => {
    console.log('Database seeding complete');
  })
  .catch((error: unknown) => {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  });
