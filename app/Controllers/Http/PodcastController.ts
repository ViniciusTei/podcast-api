import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Episode from 'App/Models/Episode';
import Podcast from 'App/Models/Podcast';
import User from 'App/Models/User';

import Parser from 'rss-parser';

export default class PodcastController {
    private parser = new Parser()

    public async create({ request, response }: HttpContextContract) {
        const { url, user_id } = request.body()


        const podcast = new Podcast();

        const user = await User.findOrFail(user_id);
        console.log(user.serialize())



        try {
            const podcastUrl = await this.parser.parseURL(url)


              podcast.author = podcastUrl.itunes?.author|| ''
              podcast.title =  podcastUrl.title|| ''
              podcast.image= podcastUrl.image?.url|| ''
              podcast.description = podcastUrl.description || ''
              podcast.feed_rss_url = url
              podcast.last_published = podcastUrl.items[0].pubDate|| ''
              await podcast.related("user_id").associate(user);



            // await Episode.createMany(podcast.items.map(item => {
            //     return {
            //         published: new Date(item.pubDate || ''),
            //         title: item.title,
            //         description: item.summary?.toString(),
            //         link: item.enclosure?.url,
            //         image: item.itunes.image,
            //         podcast_id: pod.id
            //     }
            // }))

            // return pod
        } catch (error) {
          console.log(error)
            return response.status(400).send('Fail to save podcast!')
        }

    }

    public async index() {
        const podcast = await Podcast.query().preload('user_id')
        return podcast

    }

    public async show({ request, response }: HttpContextContract) {
        const { userId } = request.params()

        try {
            const podcast = await Podcast.query().where('user_id', userId)
            return podcast
        } catch (error) {
            return response.status(400).send('Fail to get podcast!')
        }
    }

    public async delete({request, response}: HttpContextContract) {
        const { podcastId } = request.params()

        try {
            const podcast = await Podcast.findByOrFail('id', podcastId)
            await podcast.delete()

            return response.status(200).send({
                message: "Success",
                data: "Podcas deleted!"
            })
        } catch (error) {
            return response.status(500).send({
                message: 'Error',
                data: 'Internal error!'
              })
        }
    }
}
