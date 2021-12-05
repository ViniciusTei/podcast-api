import { Response, Request } from 'express';
import PodcastsService from '../services/podcastsService';
import PodcastsRepository from '../repositories/podcastsRepository';
import EpisodesRepository from '../repositories/episodesRepository';

const PodcastsController = {
  podcastService: new PodcastsService(PodcastsRepository, EpisodesRepository),
  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const podcasts = await PodcastsController.podcastService.findAll(id);
      res.send(podcasts);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async create(req: Request, res: Response) {
    const { rssFeed } = req.body;
    const { id } = req.params;
    try {
      const response = await PodcastsController.podcastService.create(rssFeed, id);
      res.json(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { podcastId } = req.query;
      await PodcastsController.podcastService.delete(podcastId as string);
      res.send('Podcast deleted!');
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  },
};

export default PodcastsController;
