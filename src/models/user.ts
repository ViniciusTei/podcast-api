import mongoose, { ObjectId, SchemaDefinitionProperty } from 'mongoose';

const { Schema } = mongoose;

export type UserModel = {
    _id?: ObjectId
    name: string
    email: string
    password: string
    podcasts: SchemaDefinitionProperty<Array<string>>;
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
  podcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'podcasts',
    },
  ],
});

const userModel = mongoose.model<UserModel>('users', userSchema);

export default userModel;
