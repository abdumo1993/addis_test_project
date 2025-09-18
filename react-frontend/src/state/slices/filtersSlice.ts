import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FiltersState, SortingPayload } from "../types";

const initialState: FiltersState = {
  genre: "",
  artist: "",
  album: "",
  searchQuery: "",
  sortBy: "title",
  sortOrder: "asc",
  activeFilters: {
    genre: false,
    artist: false,
    album: false,
    search: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setGenreFilter: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.activeFilters.genre = !!action.payload;
    },
    setArtistFilter: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
      state.activeFilters.artist = !!action.payload;
    },
    setAlbumFilter: (state, action: PayloadAction<string>) => {
      state.album = action.payload;
      state.activeFilters.album = !!action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.activeFilters.search = !!action.payload;
    },
    setSorting: (state, action: PayloadAction<SortingPayload>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    clearAllFilters: (state) => {
      state.genre = "";
      state.artist = "";
      state.album = "";
      state.searchQuery = "";
      state.activeFilters = {
        genre: false,
        artist: false,
        album: false,
        search: false,
      };
    },
    clearGenreFilter: (state) => {
      state.genre = "";
      state.activeFilters.genre = false;
    },
    clearArtistFilter: (state) => {
      state.artist = "";
      state.activeFilters.artist = false;
    },
    clearAlbumFilter: (state) => {
      state.album = "";
      state.activeFilters.album = false;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
      state.activeFilters.search = false;
    },
    resetFilters: () => {
      return { ...initialState };
    },
  },
});

export const {
  setGenreFilter,
  setArtistFilter,
  setAlbumFilter,
  setSearchQuery,
  setSorting,
  clearAllFilters,
  clearGenreFilter,
  clearArtistFilter,
  clearAlbumFilter,
  clearSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
