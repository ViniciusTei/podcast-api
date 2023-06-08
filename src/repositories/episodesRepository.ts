import { ObjectId } from 'mongoose';
import EpisodeModel from '../models/episode';

type EpisodesModel = {
    title: string
    description: string
    audioUrl: string
    audioLength: number
    releaseDate: string
    thumbnail: string
    members: string
    podcastId: string
}

const fields = '_id title description audioUrl audioLength releaseDate members thumbnail';

const EpisodesRepository = {
  async create(episodes: EpisodesModel[]) {
    const model = new EpisodeModel();
    await model.collection.insertMany(episodes);
  },
  async findEpisodes(podcastId: string) {
    const episodes = await EpisodeModel.find({ podcastId }, fields)
      .exec();

    return episodes;
  },
  async deleteByPodcastId(podcastId: string) {
    await EpisodeModel.deleteMany({ podcastId });
  },
  async findEpisodeById(episodeId: ObjectId) {
    const response = await EpisodeModel.findOne({ _id: episodeId }, fields)
      .exec();

    return response;
  },
};

export default EpisodesRepository;
