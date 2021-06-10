import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class RssParser {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { userId } = request.body()
    const user = await User.findBy('id', userId)
    
    if(!user) return response.status(404).send('User not found!')
    
    await next()
  }
}
