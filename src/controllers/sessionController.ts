import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/userRepository';
import hash from '../utils/crypto';
import { UserModel } from '../models/user';

interface ISession {
    email: string
    password: string
}

const SessionController = {
  async login(req: Request, res: Response) {
    const { email, password }: ISession = <ISession> req.body;
    const hashedPassword = hash(password);

    const user: UserModel | null = await UserRepository.findByEmail(email);

    if (!user) {
      res.status(400).send({ message: 'User or password incorrect!' });
      return;
    }

    if (user?.password !== hashedPassword) {
      res.status(400).send({ message: 'User or password incorrect!' });
      return;
    }

    if (process.env.SECRET) {
      const jwtToken = jwt.sign({ _id: user._id, email: user.email, name: user.name },
        process.env.SECRET, {
          expiresIn: 60 * 60 * 24, // 1 dia
        });

      const refresh = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365, // 1 ano
      });

      res.set('Content-Type', 'application/json');
      res.status(200).send({
        token: jwtToken,
        refresh_token: refresh,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      throw new Error('Missing SECRET environment variable!');
    }
  },

  // eslint-disable-next-line consistent-return
  async refreshToken(
    req: Request,
    res: Response,
  ) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.send(404).send({
        message: 'Missing token!',
      });
    }

    if (process.env.SECRET) {
      // eslint-disable-next-line consistent-return
      jwt.verify(token, process.env.SECRET, async (err, user) => {
        if (err) {
          return res.send(401).send({
            message: 'Invalid token!',
          });
        }

        const userId = req.params.id;
        const response = await UserRepository.findOne(userId);

        if ((user as UserModel)?._id !== response?._id) {
          return res.send(401).send({
            message: 'Invalid token!',
          });
        }

        if (response) {
          const jwtToken = jwt.sign({
            _id: response?._id,
            email: response?.email,
            name: response?.name,
          },
          process.env.SECRET ?? '', {
            expiresIn: 60 * 60 * 24, // 1 dia
          });

          const refresh = jwt.sign({ _id: response?._id }, process.env.SECRET ?? '', {
            expiresIn: 60 * 60 * 24 * 365, // 1 ano
          });

          return res.status(200).send({
            message: 'Successfuly logged in!',
            token: jwtToken,
            refresh_token: refresh,
          });
        }
      });
    } else {
      throw new Error('Missing SECRET environment variable!');
    }
  },

};

export default SessionController;
