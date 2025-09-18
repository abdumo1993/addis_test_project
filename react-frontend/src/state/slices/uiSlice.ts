import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UiState, NotificationPayload } from "../types/ui.types";

const initialState: UiState = {
  theme: "light",
  sidebarOpen: true,
  addSongModalOpen: false,
  editSongModalOpen: false,
  deleteConfirmModalOpen: false,
  selectedSong: null,
  notifications: [],
  loading: {
    songs: false,
    statistics: false,
    addSong: false,
    updateSong: false,
    deleteSong: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Modal management
    openAddSongModal: (state: UiState) => {
      state.addSongModalOpen = true;
    },
    closeAddSongModal: (state: UiState) => {
      state.addSongModalOpen = false;
    },
    openEditSongModal: (state: UiState, action: PayloadAction<string>) => {
      state.editSongModalOpen = true;
      state.selectedSong = action.payload;
    },
    closeEditSongModal: (state: UiState) => {
      state.editSongModalOpen = false;
      state.selectedSong = null;
    },
    openDeleteConfirmModal: (state: UiState, action: PayloadAction<string>) => {
      state.deleteConfirmModalOpen = true;
      state.selectedSong = action.payload;
    },
    closeDeleteConfirmModal: (state: UiState) => {
      state.deleteConfirmModalOpen = false;
      state.selectedSong = null;
    },
    closeAllModals: (state: UiState) => {
      state.addSongModalOpen = false;
      state.editSongModalOpen = false;
      state.deleteConfirmModalOpen = false;
      state.selectedSong = null;
    },

    // Loading state management
    setLoading: (
      state: UiState,
      action: PayloadAction<{ key: keyof UiState["loading"]; value: boolean }>
    ) => {
      state.loading[action.payload.key] = action.payload.value;
    },

    // Theme management
    setTheme: (state: UiState, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },

    // Sidebar management
    toggleSidebar: (state: UiState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state: UiState, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    // Notification management
    addNotification: (
      state: UiState,
      action: PayloadAction<NotificationPayload>
    ) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state: UiState, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state: UiState) => {
      state.notifications = [];
    },
  },
});

export const {
  openAddSongModal,
  closeAddSongModal,
  openEditSongModal,
  closeEditSongModal,
  openDeleteConfirmModal,
  closeDeleteConfirmModal,
  closeAllModals,
  setLoading,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
