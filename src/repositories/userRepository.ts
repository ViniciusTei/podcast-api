import { UserModel } from '../models/user';
import database from '../database/connection';

export type UserResponse = Omit<UserModel, 'password'>

const UserRepository = {
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows[0] || null;
  },
  async create(user: UserModel): Promise<UserResponse> {
    const result = await database.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
      [user.name, user.email, user.password],
    );
    return result.rows[0];
  },

  async findOne(id: number): Promise<UserResponse | null> {
    const result = await database.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async findAll(): Promise<UserResponse[]> {
    const result = await database.query('SELECT id, name, email FROM users');
    return result.rows;
  },

  async update(user: UserResponse): Promise<UserResponse | null> {
    const result = await database.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [user.name, user.email, user.id],
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<void> {
    await database.query('DELETE FROM users WHERE id = $1', [id]);
  },
};

export default UserRepository;
