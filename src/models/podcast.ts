import mongoose, { ObjectId, SchemaDefinitionProperty } from 'mongoose';

const { Schema } = mongoose;

export type PodcastModel = {
    _id?: ObjectId
    title: string
    description: string
    image: string
    link: string
    rssFeed: string
    user: SchemaDefinitionProperty<string>
    episodes: SchemaDefinitionProperty<Array<string>>
}

const podcastSchema = new Schema<PodcastModel>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,

  },
  link: {
    type: String,
    required: true,
  },
  rssFeed: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  episodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'episodes',
    },
  ],
});

const podcastModel = mongoose.model<PodcastModel>('podcasts', podcastSchema);

export default podcastModel;
