import EpisodesService from '../../src/services/episodesService';
import FakeEpisodesRepository from '../fakes/fakeEpisodeRepository';

describe('EpisodesService', () => {
  let episodesRepository: typeof FakeEpisodesRepository;

  let podcastsRepository: typeof PodcastsRepository;

  let userRepository: typeof UserRepository;

  beforeEach(() => {
    episodesRepository = FakeEpisodesRepository;
  });

  test('Should get a list of all episodes', () => {
    const episodeSerivce = new EpisodeSerivce(episodesRepository, )
  });
});
