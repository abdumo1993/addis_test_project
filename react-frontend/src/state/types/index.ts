// Re-export all types for easy importing
export * from "./songs.types";
export * from "./statistics.types";
export * from "./filters.types";
export * from "./ui.types";

// Root state type
import type { SongsState } from "./songs.types";
import type { StatisticsState } from "./statistics.types";
import type { FiltersState } from "./filters.types";
import type { UiState } from "./ui.types";

export type RootState = {
  songs: SongsState;
  statistics: StatisticsState;
  filters: FiltersState;
  ui: UiState;
};
