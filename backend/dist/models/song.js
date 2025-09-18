import mongoose, { Schema } from "mongoose";
const songSchema = new Schema({
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
}, { timestamps: true });
const SongModel = mongoose.model("Song", songSchema);
export default SongModel;
//# sourceMappingURL=song.js.map