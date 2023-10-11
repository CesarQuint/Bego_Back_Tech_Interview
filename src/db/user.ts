import mongoose, { Schema, Model, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  token: string | null;
}

const userSchema: Schema<UserDocument> = new Schema({
  email: String,
  password: String,
  name: String,
  token: { type: String, default: null },
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema
);
