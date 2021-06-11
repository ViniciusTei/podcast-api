// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Episode from "App/Models/Episode"

export default class EpisodeContoller {
    public async index() {
        const episodes = Episode.all()

        return episodes
    }
}