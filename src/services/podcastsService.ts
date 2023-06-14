import rss from '../utils/rssParser';
import timeStringToSeconds from '../utils/timeStringToSeconds';

export default class PodcastsService {
  podcastsRepository;

  episodesRepository;

  constructor(podcastsRepository, episodesRepository) {
    this.podcastsRepository = podcastsRepository;
    this.episodesRepository = episodesRepository;
  }

  async create(rssFeed: string, id: string) {
    if (!rssFeed) {
      throw new Error('Invalid call');
    }

    try {
      const response = await rss(rssFeed);

      if (!response.title && !response.description && !response.image?.url && !response.link) {
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

      const findPodcast = await this.podcastsRepository.findeByTitle(podcast.title);

      if (findPodcast) {
        throw new Error('Podcast already exists');
      }

      const podcastCreated = await this.podcastsRepository.create(podcast);

      const episodes = response.items.map((episode) => ({
        title: episode.title || '',
        audioUrl: episode.enclosure?.url || '',
        audioLength: timeStringToSeconds(episode.itunes?.duration),
        description: episode.content || '',
        releaseDate: episode.isoDate || '',
        podcastId: podcastCreated._id,
        thumbnail: episode.itunes.image || '',
        members: episode.author || episode.creator,
      }));

      await this.episodesRepository.create(episodes);

      return {
        _id: podcastCreated._id,
        ...podcast,
        episodes,
        total_episodes: episodes.length,
      };
    } catch (error) {
      throw new Error(`Something went wrong with the server! ${error}`);
    }
  }

  async delete(podcastsId: string) {
    await this.episodesRepository.deleteByPodcastId(podcastsId);
    await this.podcastsRepository.deleteByPodcastId(podcastsId);
  }

  async findAll(userId: string) {
    const response = await this.podcastsRepository.findeByUserId(userId);

    return response;
  }
}
