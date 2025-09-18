import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Basic selectors
export const selectStatisticsState = (state: RootState) => state.statistics;
export const selectGenreStats = (state: RootState) =>
  state.statistics.genreStats;
export const selectAlbumStats = (state: RootState) =>
  state.statistics.albumStats;
export const selectSongAndAlbum = (state: RootState) =>
  state.statistics.songsAndAlbumPerPersonStats;
export const selectStatisticsTotals = (state: RootState) =>
  state.statistics.totals;
export const selectStatisticsLoading = (state: RootState) =>
  state.statistics.loading;
export const selectStatisticsError = (state: RootState) =>
  state.statistics.error;
export const selectLastUpdated = (state: RootState) =>
  state.statistics.lastUpdated;
export const selectStatLoading = (state: RootState) => state.statistics.loading;

// INSERT_YOUR_CODE

// Selector to get top 5 genres by count (descending)
export const selectTopGenres = (state: RootState) => {
  return [...selectGenreStats(state)]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

// Selector to get top 5 artists by songCount (descending)
export const selectTopArtists = (state: RootState) => {
  return [...selectSongAndAlbum(state)]
    .sort((a, b) => b.songs - a.songs)
    .slice(0, 5);
};
