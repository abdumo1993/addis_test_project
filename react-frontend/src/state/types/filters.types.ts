export interface FiltersState {
  genre: string;
  artist: string;
  album: string;
  searchQuery: string;
  sortBy: "title" | "artist" | "album" | "genre" | "year";
  sortOrder: "asc" | "desc";
  activeFilters: {
    genre: boolean;
    artist: boolean;
    album: boolean;
    search: boolean;
  };
}

export interface SortingPayload {
  sortBy: FiltersState["sortBy"];
  sortOrder: FiltersState["sortOrder"];
}
