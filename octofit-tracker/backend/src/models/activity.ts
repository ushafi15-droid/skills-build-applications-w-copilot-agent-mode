import mongoose, { Schema } from 'mongoose';

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

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
