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
        const user = await User.create({
          id: body.userId,
          email: body.email,
          name: body.name,
          image: body.image
        })
        return user.$isPersisted
      } catch (error) {
        console.log(error)
        return false
      }
    
  }
}
