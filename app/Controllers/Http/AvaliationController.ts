import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Avaliation from 'App/Models/Avaliation'
import Episode from 'App/Models/Episode'
import User from 'App/Models/User'

export default class AvaliationController {
    public async create({request, response}: HttpContextContract) {
        const { rate, user_id, episode_id } = request.body()

        try {
            const user = await User.findOrFail(user_id)
            const episode = await Episode.findOrFail(episode_id)

            const avaliation = new Avaliation()
            avaliation.rate = rate
            avaliation.episode_id = episode_id
            avaliation.user_id = user_id

            avaliation.related('user').save(user)
            avaliation.related('episode').save(episode)

            return response.status(200).send({
                message: "Success",
                data: avaliation
            })

        } catch (error) {
            console.log(error)
            return response.status(500).send({
                message: "Error",
                data: error
            })
        }
    }

    public async index({response}: HttpContextContract) {
        const avaliation = Avaliation.all()
        return response.status(200).send({
            message: "Success",
            data: avaliation
        }) 
    }
}