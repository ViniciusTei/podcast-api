import Podcasts from '../models/podcast';

type PodcastModel = {
    title: string
    description: string
    image: string
    link: string
    user: string
    rssFeed: string
}

const PodcastsRepository = {
  async create(podcast: PodcastModel) {
    const newPodcast = new Podcasts();
    newPodcast.title = podcast.title;
    newPodcast.description = podcast.description;
    newPodcast.image = podcast.image;
    newPodcast.link = podcast.link;
    newPodcast.user = podcast.user;
    newPodcast.rssFeed = podcast.rssFeed;

    newPodcast.save();
    return newPodcast;
  },
  async findeByTitle(title: string) {
    const podcast = Podcasts.findOne({ title }).exec();
    return podcast;
  },
  async findeByUserId(userId: string) {
    const response = await Podcasts.find({ user: userId }, '_id title description image link rssFeed').exec();

    return response;
  },
};

export default PodcastsRepository;
