// character.model.ts

import mongoose, { Document } from 'mongoose';

export interface Character extends Document {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

const characterSchema = new mongoose.Schema<Character>({
  name: String,
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    name: String,
    url: String,
  },
  location: {
    name: String,
    url: String,
  },
  image: String,
  episode: [String],
  url: String,
  created: Date,
});

export const CharacterModel = mongoose.model<Character>('Character', characterSchema);