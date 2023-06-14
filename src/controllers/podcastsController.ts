import { Response, Request, NextFunction } from 'express';
import PodcastsService from '../services/podcastsService';
import PodcastsRepository from '../repositories/podcastsRepository';
import EpisodesRepository from '../repositories/episodesRepository';

const PodcastsController = {
  podcastService: new PodcastsService(PodcastsRepository, EpisodesRepository),
  async index(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const podcasts = await PodcastsController.podcastService.findAll(id);
      res.send(podcasts);
    } catch (error) {
      next(error);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    const { rssFeed } = req.body;
    const { id } = req.params;
    try {
      const response = await PodcastsController.podcastService.create(rssFeed, id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { podcastId } = req.query;
      await PodcastsController.podcastService.delete(podcastId as string);
      res.send('Podcast deleted!');
    } catch (error) {
      next(error);
    }
  },
};

export default PodcastsController;
