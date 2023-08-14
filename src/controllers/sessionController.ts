import { Response, Request } from 'express';
import User from '../models/user';

interface ISession {
    email: string
    password: string
}

const SessionController = {
  async login(req: Request, res: Response) {
    const { email, password }: ISession = <ISession> req.body;
    const auth = await User.singIn({ email, password });

    res.set('Content-Type', 'application/json');
    res.status(200).send({
      token: auth.session.access_token,
      refresh_token: auth.session.refresh_token,
      user: auth.user,
    });
  },

};

export default SessionController;
