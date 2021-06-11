import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Episode from "App/Models/Episode"

export default class EpisodeContoller {
    public async index({request, response}: HttpContextContract) {
        const { page } = request.params()
        const limit = 15

        const episodes = await Episode
            .query()
            .leftJoin('avaliations', 'episodes.id', 'avaliations.episode_id')
            .paginate(page, limit)

        return response.status(200).send({
            message: "Sucessa",
            data: episodes
        })
    }

    public async deleteAll({response}: HttpContextContract) {
        const episodes = Episode.all()

        ;(await episodes).forEach(async episode => {
            await episode.delete()
        })

        return response.status(200).send({
            message: "Success",
            data: "Deleted!"
        })
    }
}