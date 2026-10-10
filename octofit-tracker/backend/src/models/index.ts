import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
    email: String,
    displayName: String,
  },
  { collection: 'users', strict: false, timestamps: true },
);

const teamSchema = new Schema(
  {
    name: String,
    members: [Schema.Types.Mixed],
  },
  { collection: 'teams', strict: false, timestamps: true },
);

const activitySchema = new Schema(
  {
    user: Schema.Types.Mixed,
    team: Schema.Types.Mixed,
    activityType: String,
    duration: Number,
    distance: Number,
    completedAt: Date,
  },
  { collection: 'activities', strict: false, timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: Schema.Types.Mixed,
    team: Schema.Types.Mixed,
    points: Number,
    rank: Number,
  },
  { collection: 'leaderboard', strict: false, timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: String,
    description: String,
    category: String,
    difficulty: String,
  },
  { collection: 'workouts', strict: false, timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard =
  mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
