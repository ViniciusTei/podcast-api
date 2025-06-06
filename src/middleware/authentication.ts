import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user';

export default function auth(
  req: Request,
  res: Response,
  next: NextFunction,
): Response<unknown, Record<string, unknown>> | undefined {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      message: 'Unauhtorized!',
    });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.SECRET ?? '', (err, user) => {
    if (err) {
      return res.status(401).send({
        message: 'Invalid token!',
      });
    }

    const userId = req.params.id;
    if (userId !== (user as UserModel)?.id.toString()) {
      return res.status(401).send({
        message: 'Invalid token!',
      });
    }

    next();
  });

  return undefined;
}
