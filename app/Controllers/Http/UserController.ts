import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async index() {
    const user = await User.all()
    return user
  }

  public async session(ctx: HttpContextContract) {
      const body = ctx.request.body()

      try {
        const find = await User.findBy('email', body.email)
        
        if(find) {
          return ctx.response.status(200).cookie('user', {userId: find.id}).send({message: 'Success', data: find})
        }

        const user = await User.create({
          email: body.email,
          name: body.name,
          image: body.image
        })
        return ctx.response.status(200).cookie('user', {userId: user.id}).send({message: 'Success', data: user})
        
      } catch (error) {
        
        return ctx.response.status(500).send({
          message: 'Error',
          data: error
        })
      }
    
  }
}
