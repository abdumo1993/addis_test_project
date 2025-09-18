export type Theme = "light" | "dark";

export interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: string;
}

export interface LoadingState {
  songs: boolean;
  statistics: boolean;
  addSong: boolean;
  updateSong: boolean;
  deleteSong: boolean;
}

export interface UiState {
  theme: Theme;
  sidebarOpen: boolean;
  addSongModalOpen: boolean;
  editSongModalOpen: boolean;
  deleteConfirmModalOpen: boolean;
  selectedSong: string | null;
  notifications: Notification[];
  loading: LoadingState;
}

export interface NotificationPayload {
  type: Notification["type"];
  message: string;
}

export interface LoadingPayload {
  key: keyof LoadingState;
  value: boolean;
}
