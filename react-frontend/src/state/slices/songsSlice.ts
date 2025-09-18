import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SongsState, Song, AddSongPayload } from "../types";

const initialState: SongsState = {
  songs: [],
  filteredSongs: [],
  loading: false,
  error: null,
  searchQuery: "",
  sortBy: "title",
  sortOrder: "asc",
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // async request triggers (watched by sagas)
    fetchSongsRequest: (state: SongsState) => {
      state.loading = true;
      state.error = null;
    },
    addSongRequest: (
      _state: SongsState,
      _action: PayloadAction<AddSongPayload>
    ) => {},
    updateSongRequest: (
      _state: SongsState,
      _action: PayloadAction<{
        id: string;
        updates: Partial<Omit<Song, "id" | "createdAt" | "updatedAt">>;
      }>
    ) => {},
    deleteSongRequest: (
      _state: SongsState,
      _action: PayloadAction<string>
    ) => {},

    // loading + error helpers
    setSongError: (state: SongsState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      if (action.payload) {
        state.loading = false; // Stop loading when error occurs
      }
    },

    setSongs: (state: SongsState, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.filteredSongs = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSong: (state: SongsState, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.filteredSongs.push(action.payload);
    },
    updateSong: (state: SongsState, action: PayloadAction<Song>) => {
      const { id, ...updates } = action.payload;
      const songIndex = state.songs.findIndex((song) => song.id === id);
      const filteredIndex = state.filteredSongs.findIndex(
        (song) => song.id === id
      );

      if (songIndex !== -1) {
        state.songs[songIndex] = { ...state.songs[songIndex], ...updates };
      }
      if (filteredIndex !== -1) {
        state.filteredSongs[filteredIndex] = {
          ...state.filteredSongs[filteredIndex],
          ...updates,
        };
      }
    },
    deleteSong: (state: SongsState, action: PayloadAction<string>) => {
      const id = action.payload;
      state.songs = state.songs.filter((song) => song.id !== id);
      state.filteredSongs = state.filteredSongs.filter(
        (song) => song.id !== id
      );
    },

    clearSongError: (state: SongsState) => {
      state.error = null;
    },
    clearSongs: (state: SongsState) => {
      state.songs = [];
      state.filteredSongs = [];
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  addSongRequest,
  updateSongRequest,
  deleteSongRequest,
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  setSongError,
  clearSongError,
  clearSongs,
} = songsSlice.actions;

export default songsSlice.reducer;
