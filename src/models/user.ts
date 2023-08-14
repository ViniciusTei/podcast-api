import supabase from '../database';

export type UserModel = {
  id: string;
  name: string;
  email: string;
}

export type UserAuthModel = {
  email: string;
  password: string;
}

class User {
  static findAll() {
    return supabase.from('users').select();
  }

  static async findOne(params: unknown) {
    const response = await supabase.from('users')
      .select()
      .match(params);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  static async findById(params: { id: string }) {
    const response = await supabase.from('users')
      .select()
      .match(params);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  static async deleteOne(params: unknown) {
    const response = await supabase.from('users')
      .delete()
      .match(params);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  static async create(params: UserAuthModel) {
    const { data: userAuth, error: authError } = await supabase.auth.signUp(params);

    if (authError) {
      throw new Error(authError.message);
    }

    const { data: userToResponse, error } = await supabase
      .from('users')
      .insert(userAuth);

    if (error) {
      throw new Error(error.message);
    }

    return userToResponse;
  }

  static async singIn(params: UserAuthModel) {
    const { data: userAuth, error: authError } = await supabase.auth.signInWithPassword(params);

    if (authError) {
      throw new Error(authError.message);
    }

    return userAuth;
  }
}

export default User;
