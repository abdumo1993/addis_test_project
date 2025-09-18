import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  StatisticsState,
  StatisticsData,
  GenreStat,
  songAndAlbumPerArtistStatType,
  AlbumStat,
} from "../types";

const initialState: StatisticsState = {
  genreStats: [],
  albumStats: [],
  songsAndAlbumPerPersonStats: [],

  totals: {
    songs: 0,
    albums: 0,
    genres: 0,
    artists: 0,
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    // async request trigger (watched by sagas)
    fetchStatisticsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    setStatError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setStatistics: (state, action: PayloadAction<StatisticsData>) => {
      const { genreStats, albumStats, totals, songAndAlbumPerArtistStat } =
        action.payload;
      state.genreStats = genreStats;
      state.albumStats = albumStats;
      state.totals = totals;
      state.songsAndAlbumPerPersonStats = songAndAlbumPerArtistStat;
      state.lastUpdated = new Date().toISOString();
      state.loading = false;
      state.error = null;
    },
    updateGenreStats: (state, action: PayloadAction<GenreStat[]>) => {
      state.genreStats = action.payload;
      state.lastUpdated = new Date().toISOString();
    },

    updateAlbumStats: (state, action: PayloadAction<AlbumStat[]>) => {
      state.albumStats = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    updateSAndAPAStats: (
      state,
      action: PayloadAction<songAndAlbumPerArtistStatType[]>
    ) => {
      state.songsAndAlbumPerPersonStats = action.payload;
      state.lastUpdated = new Date().toISOString();
    },

    updateTotals: (state, action: PayloadAction<StatisticsState["totals"]>) => {
      state.totals = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearStatError: (state) => {
      state.error = null;
    },
    clearStatistics: (state) => {
      state.genreStats = [];
      state.albumStats = [];
      state.songsAndAlbumPerPersonStats = [];
      state.totals = {
        songs: 0,
        albums: 0,
        genres: 0,
        artists: 0,
      };
      state.error = null;
      state.lastUpdated = null;
    },
  },
});

export const {
  fetchStatisticsRequest,
  setStatError,
  setStatistics,
  updateGenreStats,
  updateTotals,
  clearStatError,
  clearStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
