import User, { UserModel, UserAuthModel } from '../models/user';

const UserRepository = {
  findByEmail(email: string) {
    return User.findOne({ email });
  },
  async create(user: UserAuthModel) {
    const userToResponse = await User.create(user);
    return userToResponse;
  },
  async findOne(id: string) {
    return User.findOne({ id: id as unknown });
  },
  async findAll(): Promise<Array<UserModel>> {
    const { data, error } = await User.findAll();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  async update({ id, name, email }: UserModel) {
    const userToUpdate = await User.findById({ id });

    // if (userToUpdate) {
    //   userToUpdate.name = name;
    //   userToUpdate.email = email;
    //
    //   userToUpdate.save();
    //
    //   return userToUpdate;
    // }
    console.log('update', userToUpdate);

    return null;
  },
  async delete(id: string) {
    await User.deleteOne({ _id: id as unknown });
  },
};

export default UserRepository;
