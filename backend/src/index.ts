import express from "express";
import type { Song, Stats } from "./types.js";
import SongModel, { type SongDoc } from "./models/song.js";

import mongoose from "mongoose";
import cors from "cors";

const app = express();
// Only load .env when in development mode
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}
const port = process.env.PORT ?? 3000;

// CORS

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // not a browser
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        // allowed origin
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORsS"));
      }
    },
    credentials: true,
  })
);

// parse JSON bodies
app.use(express.json());

// setup mongoose
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/addis_software";
await mongoose.connect(MONGODB_URI);

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

/**
 TODO: Implement the following endpoints:
 /api/song: create a song,[X]
 /api/song/:id: update a song,[X]
 /api/song/:id: delete a song,[X]
 /api/song/:id: get a song,[X]
 /api/song: get all songs,[X]
 /api/song/genre/:genre: get all songs by genre,[]
 /api/song/artist/:artist: get all songs by artist,[]
 /api/song/album/:album: get all songs by album,[]
 /api/song/stats: get stats about the songs[]

 */

// endpoints
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Express + TypeScript running" });
});

// create a song
app.post("/api/song", async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body as Partial<Song>;

    if (!title || !artist || !album || !genre) {
      return res.status(400).json({
        status: "error",
        message: "title, artist, album, and genre are required",
      });
    }

    const newSong: SongDoc = await SongModel.create({
      title,
      artist,
      album,
      genre,
    });

    return res.status(201).json(newSong);
  } catch (error: unknown) {
    // Mongoose validation error
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ status: "error", message: error.message });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});
// update a song
app.patch("/api/song/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { title, artist, album, genre } = req.body as Partial<Song>;

    const updateData: Partial<Song> = {};
    if (title !== undefined) updateData.title = title;
    if (artist !== undefined) updateData.artist = artist;
    if (album !== undefined) updateData.album = album;
    if (genre !== undefined) updateData.genre = genre;

    const updatedSong = await SongModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedSong) {
      return res
        .status(404)
        .json({ status: "error", message: "Song Not found" });
    }

    return res.status(200).json(updatedSong);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ status: "error", message: error.message });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});
// delete a song
app.delete("/api/song/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await SongModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", message: "Song Not found" });
    }
    return res.status(204).send();
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

// get a song by id
app.get("/api/song/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const song = await SongModel.findById(id);
    if (!song) {
      return res
        .status(404)
        .json({ status: "error", message: "Song not found" });
    }
    return res.status(200).json(song);
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});
// get all songs
// GET /songs?limit=10&lastId=_id
app.get("/api/song", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const lastId = req.query.lastId as string;
    const query = lastId ? { _id: { $gt: lastId } } : {};
    const songs = await SongModel.find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .lean();

    return res.status(200).json(songs);
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

app.get("/api/stats", async (req, res) => {
  // const stats: Stats;

  /**
 * total # of songs, artists, albums, genres
 * # of songs in every genre
 * # of songs and albums each artist has
 * # songs in each album
 * most popular genre (by song count)
 * most prolific artist (by song or album count)
 * albums released per year
 * artists with songs in multiple genres
\
 */

  try {
    const stats = await SongModel.aggregate([
      {
        $facet: {
          totalSongs: [{ $count: "count" }],
          totalArtists: [{ $group: { _id: "$artist" } }, { $count: "count" }],
          totalAlbums: [{ $group: { _id: "$album" } }, { $count: "count" }],
          totalGenres: [{ $group: { _id: "$genre" } }, { $count: "count" }],
          songsPerGenre: [{ $group: { _id: "$genre", count: { $sum: 1 } } }],
          songsPerAlbum: [
            {
              $group: {
                _id: "$album",
                count: { $sum: 1 },
                artist: { $first: "$artist" },
              },
            },
          ],
          songsAndAlbumsPerArtist: [
            {
              $group: {
                _id: "$artist",
                totalSongs: { $sum: 1 },
                albums: { $addToSet: "$album" },
              },
            },
            { $project: { totalSongs: 1, totalAlbums: { $size: "$albums" } } },
          ],
        },
      },
    ]);
    return res.status(200).json(stats);
  } catch (error: unknown) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internalsk server error" });
  }
});

app.listen(Number(port), () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
