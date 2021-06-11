import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async index() {
    const user = await User.all()
    return user
  }

  public async create(ctx: HttpContextContract) {
      const body = ctx.request.body()

      try {
        const userById = await User.findBy('id', body.userId)

        if(userById) {
          return ctx.response.status(403).send({
            message: 'Error',
            data: 'User alredy exists!'
          })
        }
        await User.create({
          id: body.userId,
          email: body.email,
          name: body.name,
          image: body.image
        })
        return ctx.response.status(200).cookie('user', {userId: body.userId}).send({message: 'Success'})
        
      } catch (error) {
        
        return ctx.response.status(500).send({
          message: 'Error',
          data: 'Internal error!'
        })
      }
    
  }
}
