import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Episode from 'App/Models/Episode';
import Podcast from 'App/Models/Podcast';

import Parser from 'rss-parser';

export default class PodcastController {
    private parser = new Parser()

    public async create({ request, response }: HttpContextContract) {
        const { url } = request.body()
        const { userId } = request.cookie('user')
        
        try {
            const podcast = await this.parser.parseURL(url)
            // console.log(pod.items[0].enclosure?.url)
            const pod = await Podcast.create({
                author: podcast.itunes?.author,
                title: podcast.title,
                image: podcast.image?.url,
                link: podcast.link,
                description: podcast.description,
                feed_rss_url: url,
                last_published: podcast.items[0].pubDate,
                user_id: userId
            })


            await Episode.createMany(podcast.items.map(item => {
                return {
                    published: new Date(item.pubDate || ''),
                    title: item.title,
                    description: item.summary,
                    link: item.enclosure?.url,
                    image: item.itunes.image
                }
            }))

            return pod
        } catch (error) {
            return response.status(400).send('Fail to save podcast!')
        }
      
    }

    public async index() {
        const podcasts = await Podcast.all()
        return podcasts
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