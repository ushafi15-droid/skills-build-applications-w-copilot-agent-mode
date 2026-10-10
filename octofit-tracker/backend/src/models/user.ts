import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
    email: String,
    displayName: String,
  },
  { collection: 'users', strict: false, timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
