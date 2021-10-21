import EpisodeModel from '../models/episode';

type Episdoes = {
    title: string
    description: string
    audioUrl: string
    audioLength: number
    releaseDate: string
    podcastId: string
}
const fields = '_id title description audioUrl audioLength releaseDate';

const EpisodesRepository = {
  async create(episodes: Episdoes[]) {
    const model = new EpisodeModel();
    await model.collection.insertMany(episodes);
  },
  async findEpisodes(podcastId: string) {
    const episodes = await EpisodeModel.find({ podcastId }, fields).exec();
    return episodes;
  },
  async deleteByPodcastId(podcastId: string) {
    await EpisodeModel.deleteMany({ podcastId });
  },
};

export default EpisodesRepository;
