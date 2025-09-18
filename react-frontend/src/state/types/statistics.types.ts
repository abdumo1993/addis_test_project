export interface GenreStat {
  genre: string;
  count: number;
}
export interface AlbumStat {
  album: string;
  count: number;
  artist: string;
}

export interface songAndAlbumPerArtistStatType {
  album: number;
  artist: string;
  songs: number;
}

export interface StatisticsTotals {
  songs: number;
  albums: number;
  genres: number;
  artists: number;
}

export interface StatisticsState {
  genreStats: GenreStat[];
  albumStats: AlbumStat[];
  totals: StatisticsTotals;
  songsAndAlbumPerPersonStats: songAndAlbumPerArtistStatType[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface StatisticsData {
  genreStats: GenreStat[];
  albumStats: AlbumStat[];
  songAndAlbumPerArtistStat: songAndAlbumPerArtistStatType[];
  totals: StatisticsTotals;
}

type countType = {
  count: number;
};
type labledCountType = {
  count: number;
  _id: string;
};
type songAlbumCountType = {
  _id: string;
  totalSongs: number;
  totalAlbums: number;
};
type songPerAlbumType = {
  _id: string;
  count: number;
  artist: string;
};
export type StatDataType = {
  totalArtists: countType[];
  totalAlbums: countType[];
  totalGenres: countType[];
  totalSongs: countType[];
  songsPerGenre: labledCountType[];
  songsPerAlbum: songPerAlbumType[];
  songsAndAlbumsPerArtist: songAlbumCountType[];
};
