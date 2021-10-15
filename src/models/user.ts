import mongoose from 'mongoose';

const { Schema } = mongoose;

type UserModel = {
    name: string
    email: string
    password: string
}

const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,

  },
});

const userModel = mongoose.model<UserModel>('users', userSchema);

export default userModel;
