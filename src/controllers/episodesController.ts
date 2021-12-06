import { Response, Request } from 'express';

import EpisodesRepository from '../repositories/episodesRepository';
import PodcastsRepository from '../repositories/podcastsRepository';
import UserRepository from '../repositories/userRepository';

import EpisodesService from '../services/episodesService';

const EpisodesController = {
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    try {
      const service = new EpisodesService(EpisodesRepository, PodcastsRepository, UserRepository);

      const response = await service.findAllFromPodcast(page as string, pageSize as string, id);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  },
};

export default EpisodesController;
