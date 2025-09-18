export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SongsState {
  songs: Song[];
  filteredSongs: Song[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: "title" | "artist" | "album" | "genre" | "year";
  sortOrder: "asc" | "desc";
}

export interface AddSongPayload {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface UpdateSongPayload {
  id: string;
  updates: Partial<Omit<Song, "id" | "createdAt" | "updatedAt">>;
}
