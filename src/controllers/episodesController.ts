import { Response, Request } from 'express';
import { compareDesc } from 'date-fns';
import rss from '../utils/rssParser';
import timeStringToSeconds from '../utils/timeStringToSeconds';

import EpisodesRepository from '../repositories/episodesRepository';
import PodcastsRepository from '../repositories/podcastsRepository';
import UserRepository from '../repositories/userRepository';

type Episode = {
  _id: string
  title: string
  description: string
  audioUrl: string
  audioLength: number
  releaseDate: string
}

type Podcast = {
  _id: string
  title: string
  description: string
  image: string
  link: string
  rssFeed: string
}

function sortEpisodes(a: Episode, b: Episode) {
  return compareDesc(new Date(a.releaseDate), new Date(b.releaseDate));
}

async function searchForNewEpisodes(podcast: Podcast, lastEpisode: Episode) {
  const feed = await rss(podcast.rssFeed);
  let episodesIndex = 0;

  const episodes = [];
  while (compareDesc(
    new Date(lastEpisode.releaseDate),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new Date(feed.items[episodesIndex].isoDate!),
  )) {
    episodes.push({
      title: feed.items[episodesIndex].title || '',
      audioUrl: feed.items[episodesIndex].enclosure?.url || '',
      audioLength: typeof feed.items[episodesIndex].itunes?.duration === 'string'
        ? timeStringToSeconds(feed.items[episodesIndex].itunes?.duration)
        : feed.items[episodesIndex].itunes?.duration,
      description: feed.items[episodesIndex].content || '',
      releaseDate: feed.items[episodesIndex].isoDate || '',
      podcastId: podcast._id,
    });

    episodesIndex += 1;
  }

  if (episodes.length > 0) {
    await EpisodesRepository.create(episodes);
    // eslint-disable-next-line no-console
    console.log('⚡️[server]: Episodes updated');
  }
}

const EpisodesController = {
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const { page = 0, pageSize = 10 } = req.query;

    try {
      const user = await UserRepository.findOne(id);

      if (!user) {
        res.status(400).send('User not found');
        throw new Error('User not found');
      }

      const podcasts = await PodcastsRepository.findeByUserId(user._id);
      let episodes: Episode[] = [];

      for (const podcast of podcasts) {
        const episodesByPodcast = await EpisodesRepository.findEpisodes(podcast._id);
        // check for new episodes in each podcast
        episodesByPodcast.sort(sortEpisodes);
        await searchForNewEpisodes(podcast, episodesByPodcast[0]);
        episodes = episodes.concat(episodesByPodcast);
      }

      episodes.sort(sortEpisodes);

      const numberPage = typeof page !== 'number' ? parseInt(page as string, 10) : page;
      const numberPageSize = typeof pageSize !== 'number' ? parseInt(pageSize as string, 10) : pageSize;

      const offset = numberPage === 0 ? numberPage : numberPage * numberPageSize;

      const episodesResponse = [];

      for (let i = offset; i < (numberPageSize + offset); i += 1) {
        episodesResponse.push(episodes[i]);
      }

      res.json(episodesResponse);
    } catch (error) {
      res.status(500).send({
        error,
      });
    }
  },
};

export default EpisodesController;
