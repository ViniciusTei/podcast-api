import { Response, Request } from 'express';
import UserRepository from '../repositories/userRepository';

const UserController = {
  async index(req: Request, res: Response) {
    const users = await UserRepository.findAll();
    res.send(users);
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserRepository.findOne(id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async create(req: Request, res: Response) {
    const user = req.body;
    try {
      const userAlreadyExists = await UserRepository.findByEmail(user.email);

      if (userAlreadyExists) {
        res.status(400).send({ message: 'User already exists!' });
      }

      const newUser = await UserRepository.create(user);

      res.json(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    try {
      const newUser = await UserRepository.update({ _id: id, ...data });
      res.send({
        user: newUser,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await UserRepository.delete(id);
      res.send({
        message: 'Users successfuly deleted!',
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

export default UserController;
