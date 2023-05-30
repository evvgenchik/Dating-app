import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activeteLink: { type: String },
});
const UserModel = model('User', UserSchema);

export default UserModel;
