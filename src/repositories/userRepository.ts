import User, { UserModel } from '../models/user';
import hash from '../utils/crypto';

export type UserResponse = Omit<UserModel, 'password' | 'podcasts'>

const fieldsToRetrieve = '_id name email';

const UserRepository = {
  findByEmail(email: string) {
    return User.findOne({ email }).exec();
  },
  async create(user: UserModel) {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hash(user.password);

    newUser.save();

    const userToResponse = await User.findOne({ _id: newUser._id }, fieldsToRetrieve).exec();

    return userToResponse;
  },
  async findOne(id: string) {
    return User.findOne({ _id: id as unknown }, fieldsToRetrieve).exec();
  },
  async findAll(): Promise<Array<UserResponse>> {
    return User.find({}, fieldsToRetrieve);
  },
  async update({ _id, name, email }: UserResponse) {
    const userToUpdate = await User.findById({ _id }, fieldsToRetrieve).exec();

    if (userToUpdate) {
      userToUpdate.name = name;
      userToUpdate.email = email;

      userToUpdate.save();

      return userToUpdate;
    }

    return null;
  },
  async delete(id: string) {
    await User.deleteOne({ _id: id as unknown });
  },
};

export default UserRepository;
