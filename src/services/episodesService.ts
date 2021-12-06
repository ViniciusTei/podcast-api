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
  thumbnail: string
  members: string
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

export default class EpisodesService {
  private episodesRepository: typeof EpisodesRepository;

  private podcastsRepository: typeof PodcastsRepository;

  private userRepository: typeof UserRepository;

  constructor(
    episodesRepository: typeof EpisodesRepository,
    podacastsRepository: typeof PodcastsRepository,
    userRepository: typeof UserRepository,
  ) {
    this.episodesRepository = episodesRepository;
    this.podcastsRepository = podacastsRepository;
    this.userRepository = userRepository;
  }

  private static sortEpisodes(a: Episode, b: Episode) {
    return compareDesc(new Date(a.releaseDate), new Date(b.releaseDate));
  }

  private static async searchForNewEpisodes(
    podcast: Podcast,
    lastEpisode: Episode,
  ): undefined | Promise<Episode[]> {
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
        audioLength: timeStringToSeconds(feed.items[episodesIndex].itunes?.duration),
        description: feed.items[episodesIndex].content || '',
        releaseDate: feed.items[episodesIndex].isoDate || '',
        podcastId: podcast._id,
        thumbnail: feed.items[episodesIndex].itunes.image || '',
        members: feed.items[episodesIndex].author || feed.items[episodesIndex].creator,
      });

      episodesIndex += 1;
    }

    if (episodes.length > 0) {
      await EpisodesRepository.create(episodes);
      // eslint-disable-next-line no-console
      console.log('⚡️[server]: Episodes updated');
      const episodesResponse = await EpisodesRepository.findEpisodes(podcast._id);
      return episodesResponse as Episode[];
    }

    return undefined;
  }

  private async getAllEpisodes(userId: string) {
    const podcasts = await this.podcastsRepository.findeByUserId(userId);
    let episodes: Episode[] = [];

    for (const podcast of podcasts) {
      const episodesByPodcast = await this.episodesRepository.findEpisodes(podcast._id);
      // check for new episodes in each podcast
      episodesByPodcast.sort(EpisodesService.sortEpisodes);
      const newEpisodes = await EpisodesService.searchForNewEpisodes(podcast, episodesByPodcast[0]);

      if (newEpisodes) {
        newEpisodes.sort(EpisodesService.sortEpisodes);
        episodes = episodes.concat(newEpisodes);
      } else {
        episodes = episodes.concat(episodesByPodcast);
      }
    }

    episodes.sort(EpisodesService.sortEpisodes);

    return episodes;
  }

  async findAllFromPodcast(page: string, pageSize: string, userId: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const episodes = await this.getAllEpisodes(user._id);

    const numberPage = typeof page !== 'number' ? parseInt(page as string, 10) : page;
    const numberPageSize = typeof pageSize !== 'number' ? parseInt(pageSize as string, 10) : pageSize;

    const offset = numberPage === 1 ? (numberPage - 1) : (numberPage - 1) * numberPageSize;

    const episodesResponse = [];
    let countPages = 0;

    for (let i = offset; i < (numberPageSize + offset); i += 1) {
      if (episodes[i]) {
        episodesResponse.push(episodes[i]);
        countPages += 1;
      }
    }

    return {
      data: episodesResponse,
      page: numberPage,
      pageSize: countPages,
      totalPages: Math.ceil(episodes.length / numberPageSize),
    };
  }

  async findEpisode(episodeId: string) {
    const episode = await this.episodesRepository.findEpisodeById(episodeId);

    return episode;
  }
}
