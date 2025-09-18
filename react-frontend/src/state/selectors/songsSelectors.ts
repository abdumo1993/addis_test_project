import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../state/store";
import type { Song } from "../types/songs.types";

// Basic selectors
export const selectAllSongs = (state: RootState): Song[] => state.songs.songs;
export const selectFilteredSongs = (state: RootState): Song[] =>
  state.songs.filteredSongs;
export const selectSongsLoading = (state: RootState): boolean =>
  state.songs.loading;
export const selectSongsError = (state: RootState): string | null =>
  state.songs.error;
export const selectSearchQuery = (state: RootState): string =>
  state.songs.searchQuery;
export const selectSortBy = (state: RootState) => state.songs.sortBy;
export const selectSortOrder= (state: RootState) => state.songs.sortOrder;
export const selectSongLodding = (state: RootState) => state.songs.loading;
export const selectSongsHasMore = (state: RootState) => state.songs.hasMore;
export const selectSongsQueryParams = (state: RootState) => state.songs.params;

export const selectSongsLength = (state: RootState) => state.songs.songs.length;
// Complex selectors with filtering
export const selectSongsWithFilters = createSelector(
  [selectAllSongs, (state: RootState) => state.filters],
  (songs, filters) => {
    return songs.filter((song) => {
      const matchesGenre = !filters.genre || song.genre === filters.genre;
      const matchesArtist = !filters.artist || song.artist === filters.artist;
      const matchesAlbum = !filters.album || song.album === filters.album;
      const matchesSearch =
        !filters.searchQuery ||
        song.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesGenre && matchesArtist && matchesAlbum && matchesSearch;
    });
  }
);

export const selectSortedSongs = createSelector(
  [selectSongsWithFilters, selectSortBy, selectSortOrder],
  (songs, sortBy, sortOrder) => {
    const isSongField = (
      key: string
    ): key is keyof Pick<Song, "title" | "artist" | "album" | "genre"> =>
      key === "title" || key === "artist" || key === "album" || key === "genre";

    return [...songs].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (isSongField(sortBy)) {
        aValue = a[sortBy];
        bValue = b[sortBy];
      } else {
        // Handle year: derive from createdAt if available
        const aYear = a.createdAt ? new Date(a.createdAt).getFullYear() : 0;
        const bYear = b.createdAt ? new Date(b.createdAt).getFullYear() : 0;
        aValue = aYear;
        bValue = bYear;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
);

// Statistics selectors
export const selectGenreCounts = createSelector([selectAllSongs], (songs) => {
  const counts = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([genre, count]) => ({
      genre,
      count,
    }))
    .sort((a, b) => b.count - a.count);
});

export const selectArtistCounts = createSelector([selectAllSongs], (songs) => {
  const counts = songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([artist, count]) => ({
      artist,
      count,
    }))
    .sort((a, b) => b.count - a.count);
});

export const selectAlbumCounts = createSelector([selectAllSongs], (songs) => {
  const counts = songs.reduce((acc, song) => {
    const key = `${song.album} - ${song.artist}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([key, count]) => {
      const [album, artist] = key.split(" - ");
      return {
        album,
        artist,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);
});
