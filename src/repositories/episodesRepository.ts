import EpisodeModel from '../models/episode';

type Episdoes = {
    title: string
    description: string
    audioUrl: string
    audioLength: number
    releaseDate: string
    podcastId: string
}
const EpisodesRepository = {
  async create(episodes: Episdoes[]) {
    const model = new EpisodeModel();
    await model.collection.insertMany(episodes);
  },
};

export default EpisodesRepository;
