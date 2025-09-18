import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Basic selectors
export const selectUiState = (state: RootState) => state.ui;

export const selectAddSongModalOpen = (state: RootState) =>
  state.ui.addSongModalOpen;
export const selectEditSongModalOpen = (state: RootState) =>
  state.ui.editSongModalOpen;
export const selectDeleteConfirmModalOpen = (state: RootState) =>
  state.ui.deleteConfirmModalOpen;
export const selectSelectedSong = (state: RootState) => state.ui.selectedSong;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectLoading = (state: RootState) => state.ui.loading;

// Computed selectors
export const selectAnyModalOpen = createSelector(
  [
    selectAddSongModalOpen,
    selectEditSongModalOpen,
    selectDeleteConfirmModalOpen,
  ],
  (addSong, editSong, deleteConfirm) => addSong || editSong || deleteConfirm
);

export const selectModalType = createSelector(
  [
    selectAddSongModalOpen,
    selectEditSongModalOpen,
    selectDeleteConfirmModalOpen,
  ],
  (addSong, editSong, deleteConfirm) => {
    if (addSong) return "addSong";
    if (editSong) return "editSong";
    if (deleteConfirm) return "deleteConfirm";
    return null;
  }
);
