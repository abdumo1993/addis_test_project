import type {
  songAndAlbumPerArtistStatType,
  GenreStat,
  StatDataType,
  StatisticsData,
  StatisticsTotals,
  AlbumStat,
} from "../state";
import type {
  Song,
  AddSongPayload,
  UpdateSongPayload,
} from "../state/types/songs.types";

import apiClient from "./apiClient";

type FetchSongsParams = {
  limit?: number;
  lastId?: string;
};

const toSong = (doc: any): Song => ({
  id: doc._id ?? doc.id,
  title: doc.title,
  artist: doc.artist,
  album: doc.album,
  genre: doc.genre,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});
const toStatisticsData = (doc: StatDataType): StatisticsData => {
  console.log("to: ", doc["totalSongs"], doc);
  const totals: StatisticsTotals = {
    songs: doc["totalSongs"][0]["count"],
    albums: doc["totalAlbums"][0]["count"],
    genres: doc["totalGenres"][0]["count"],
    artists: doc["totalArtists"][0]["count"],
  };
  const genres: GenreStat[] = doc.songsPerGenre.map((elem) => {
    return { genre: elem._id, count: elem.count };
  });
  const albums: AlbumStat[] = doc.songsPerAlbum.map((elem) => {
    return { album: elem._id, count: elem.count, artist: elem.artist };
  });
  console.log("albums: ", albums)

  const songAndAlbumPerArtistStat: songAndAlbumPerArtistStatType[] =
    doc.songsAndAlbumsPerArtist.map((elem) => {
      return {
        artist: elem._id,
        songs: elem.totalSongs,
        album: elem.totalAlbums,
      } as songAndAlbumPerArtistStatType;
    });

  const data: StatisticsData = {
    totals: totals,
    albumStats: albums,
    genreStats: genres,
    songAndAlbumPerArtistStat: songAndAlbumPerArtistStat,
  };
  console.log("data: ", data);
  return data;
};
const getErrorMessage = (error: any, fallback: string): string =>
  error?.response?.data?.message || error?.message || fallback;

// GET /api/song
export const fetchSongsRepo = async (
  params?: FetchSongsParams
): Promise<Song[]> => {
  try {
    const response = await apiClient.get("/api/song", { params });
    const data = Array.isArray(response.data) ? response.data : [];
    return data.map(toSong);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to fetch songs"));
  }
};

// GET /api/song/:id
export const fetchSongByIdRepo = async (id: string): Promise<Song> => {
  try {
    const response = await apiClient.get(`/api/song/${id}`);
    return toSong(response.data);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to fetch song"));
  }
};

// POST /api/song
export const createSongRepo = async (
  payload: AddSongPayload
): Promise<Song> => {
  try {
    const response = await apiClient.post("/api/song", payload);
    return toSong(response.data);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to create song"));
  }
};

// PATCH /api/song/:id
export const updateSongRepo = async ({
  id,
  updates,
}: UpdateSongPayload): Promise<Song> => {
  try {
    const response = await apiClient.patch(`/api/song/${id}`, updates);
    return toSong(response.data);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to update song"));
  }
};

// DELETE /api/song/:id
export const deleteSongRepo = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/song/${id}`);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to delete song"));
  }
};

// GET /api/song/stats
export const fetchStatisticsRepo = async (): Promise<StatisticsData> => {
  try {
    const response = await apiClient.get("/api/stats");
    console.log("recieved: ", response.data);
    return toStatisticsData(response.data[0]);
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Failed to fetch statistics"));
  }
};
