import { Response, Request } from 'express';
import timeStringToSeconds from '../utils/timeStringToSeconds';
import PodcastsRepository from '../repositories/podcastsRepository';
import EpisodesRepository from '../repositories/episodesRepository';
import rss from '../utils/rssParser';

const PodcastsController = {
  async index(req: Request, res: Response) {
    const { id } = req.params;

    const podcasts = await PodcastsRepository.findeByUserId(id);

    res.send(podcasts);
  },
  async create(req: Request, res: Response) {
    const { rssFeed } = req.body;
    const { id } = req.params;

    if (!rssFeed) {
      res.status(400).send('Invalid call, must pass a rss feed');
      throw new Error('Invalid call');
    }
    const response = await rss(rssFeed);

    if (!response.title && !response.description && !response.image?.url && !response.link) {
      res.status(403).send('Podcast missing arguments');
      throw new Error('Podcast missing arguments');
    }

    const podcast = {
      title: response.title || '',
      description: response.description || '',
      image: response.image?.url || '',
      link: response.link || '',
      user: id,
      rssFeed,
    };

    const findPodcast = await PodcastsRepository.findeByTitle(podcast.title);

    if (findPodcast) {
      res.status(403).send('Podcast already exists');
      throw new Error('Podcast already exists');
    }

    const podcastCreated = await PodcastsRepository.create(podcast);

    const episodes = response.items.map((episode) => ({
      title: episode.title || '',
      audioUrl: episode.enclosure?.url || '',
      audioLength: timeStringToSeconds(episode.itunes?.duration),
      description: episode.content || '',
      releaseDate: episode.isoDate || '',
      podcastId: podcastCreated._id,
    }));

    await EpisodesRepository.create(episodes);
    res.json({
      ...podcast,
      episodes,
      total_episodes: episodes.length,
    });
  },
  async delete(req: Request, res: Response) {
    try {
      const { podcastId } = req.query;
      await EpisodesRepository.deleteByPodcastId(podcastId as string);
      await PodcastsRepository.deleteByPodcastId(podcastId as string);

      res.send('Podcast deleted!');
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  },
};

export default PodcastsController;
