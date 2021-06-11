import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { v4 } from 'uuid';

export default class UserController {
  public async index() {
    const user = await User.all()
    return user
  }

  public async create(ctx: HttpContextContract) {
      const body = ctx.request.body()

      try {
        
        const id = v4()
        const user = await User.create({
          id: id,
          email: body.email,
          name: body.name,
          image: body.image
        })
        return ctx.response.status(200).cookie('user', {userId: id}).send({message: 'Success', data: user})
        
      } catch (error) {
        
        return ctx.response.status(500).send({
          message: 'Error',
          data: 'Internal error!'
        })
      }
    
  }
}
