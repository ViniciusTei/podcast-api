import mongoose, { ObjectId, SchemaDefinitionProperty } from 'mongoose';

const { Schema } = mongoose;

export type EpisodeModel = {
    _id?: ObjectId
    title: string
    description: string
    audioUrl: string
    audioLength: number
    releaseDate: string
    thumbnail: string
    members: string
    podcastId: SchemaDefinitionProperty<string>
}

const episodeSchema = new Schema<EpisodeModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  audioUrl: {
    type: String,
    required: true,

  },
  audioLength: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  members: {
    type: String,
    required: true,
  },
  podcastId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'podcasts',
  },
});

const episodeModel = mongoose.model<EpisodeModel>('episodes', episodeSchema);

export default episodeModel;
