import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: String,
    members: [Schema.Types.Mixed],
  },
  { collection: 'teams', strict: false, timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
