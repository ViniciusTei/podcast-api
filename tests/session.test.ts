import request from 'supertest';
import app from '../src/app';

describe('User session', () => {
  test('User can create a new session with POST /login', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({
        email: 'teste2@hotmail.com',
        password: '123456',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).not.toBeNull();
    expect(response.body.refresh_token).not.toBeNull();
    expect(response.body.user).toEqual({
      id: '61609e7d47ed27caa9cd17dc',
      name: 'teste',
      email: 'teste2@hotmail.com',
    });
  });
  test('User cannot create a new session when email is invalid', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({
        email: 'teste@hotmail.com',
        password: '123456',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('User or password incorrect!');
  });
  test('User cannot create a new session when password is invalid', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({
        email: 'teste2@hotmail.com',
        password: '12345',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('User or password incorrect!');
  });
});
