import mongoose, { Schema, type InferSchemaType } from "mongoose";
const songSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type SongDoc = InferSchemaType<typeof songSchema>;

const SongModel = mongoose.model<SongDoc>("Song", songSchema);

export default SongModel;
