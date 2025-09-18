import mongoose from "mongoose";
import SongModel from "./models/song.js";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/addis_software";
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}
async function main(): Promise<void> {
  await mongoose.connect(MONGODB_URI);

  const sample = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synth-pop",
    },
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      genre: "Rock",
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      genre: "Pop",
    },
    {
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      album: "DAMN.",
      genre: "Hip-Hop",
    },
    {
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      genre: "Pop",
    },
  ];

  await SongModel.deleteMany({});
  const inserted = await SongModel.insertMany(sample);
  console.log(`Seeded ${inserted.length} songs`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
