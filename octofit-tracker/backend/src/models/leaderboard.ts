import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: Schema.Types.Mixed,
    team: Schema.Types.Mixed,
    points: Number,
    rank: Number,
  },
  { collection: 'leaderboard', strict: false, timestamps: true },
);

export const Leaderboard =
  mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
