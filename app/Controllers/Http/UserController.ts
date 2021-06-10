import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {
  public async index() {
    
    return [
      {
        id: 0,
        name: "Vinicius Teixeira",
        email: "viniteirapa@gmail.com",
        image: ""
      },
    ]
  }

  public async create(ctx: HttpContextContract) {
      const body = ctx.request.body

      console.log(body)
      return {
          create: true
      }
  }
}
