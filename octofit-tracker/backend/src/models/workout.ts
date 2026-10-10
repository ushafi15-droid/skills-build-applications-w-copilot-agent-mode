import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: String,
    description: String,
    category: String,
    difficulty: String,
  },
  { collection: 'workouts', strict: false, timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
