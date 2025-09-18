import { useEffect } from "react";
import { useToast } from "./hooks/useToast";
import { HomeSidebar } from "./components/sidebars";
import ViewSongs from "./components/viewSongs";
import AddSong from "./components/addSong";
import UpdateSong from "./components/updateSong";
import DeleteSong from "./components/deleteSong";
import ToastManager from "./components/Toast";
import {
  fetchSongsRequest,
  fetchStatisticsRequest,
  useAppDispatch,
  useAppSelector,
  openAddSongModal,
  openEditSongModal,
  openDeleteConfirmModal,
  closeAllModals,
  selectAnyModalOpen,
  selectModalType,
  selectSelectedSong,
  selectAllSongs,
  selectNotifications,
  removeNotification,
  selectSongsError,
  clearSongError,
  selectSongsQueryParams,
} from "./state";
import type { Song } from "./state/types/songs.types";

type HomepageProps = {
  onNavigate: (page: "home" | "statistics") => void;
  onNavigateToStats: (section: "genre" | "album" | "artist") => void;
};

export default function Homepage({
  onNavigate,
  onNavigateToStats,
}: HomepageProps) {
  const dispatch = useAppDispatch();

  // Redux state selectors
  const showBackdrop = useAppSelector(selectAnyModalOpen);
  const modalType = useAppSelector(selectModalType);
  const selectedSongId = useAppSelector(selectSelectedSong);
  const songs = useAppSelector(selectAllSongs);
  const notifications = useAppSelector(selectNotifications);
  const songsError = useAppSelector(selectSongsError);
  const params = useAppSelector(selectSongsQueryParams);

  // Toast hook
  const { showError } = useToast();

  useEffect(() => {
    dispatch(fetchSongsRequest(params));
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  // Handle error toasts
  useEffect(() => {
    if (songsError) {
      showError(`Songs Error: ${songsError}`);
      // Clear the error after showing the toast
      dispatch(clearSongError());
    }
  }, [songsError, showError, dispatch]);

  const handleEditSong = (song: Song) => {
    dispatch(openEditSongModal(song.id));
  };

  const handleAddSong = () => {
    dispatch(openAddSongModal());
  };

  const handleDeleteSong = (song: Song) => {
    dispatch(openDeleteConfirmModal(song.id));
  };

  const handleCloseBackdrop = () => {
    dispatch(closeAllModals());
  };

  const handleRemoveToast = (id: string) => {
    dispatch(removeNotification(parseInt(id)));
  };

  // Get the selected song object for editing
  const selectedSong = selectedSongId
    ? songs.find((song) => song.id === selectedSongId)
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <HomeSidebar onNavigateToStats={onNavigateToStats} />

      <div style={{ flex: 1, position: "relative" }}>
        <ViewSongs
          onNavigate={onNavigate}
          onEditSong={handleEditSong}
          onDeleteSong={handleDeleteSong}
          onAddSong={handleAddSong}
        />

        {showBackdrop && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseBackdrop}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {modalType === "addSong" && (
                <AddSong onClose={handleCloseBackdrop} />
              )}
              {modalType === "editSong" && selectedSong && (
                <UpdateSong song={selectedSong} onClose={handleCloseBackdrop} />
              )}
              {modalType === "deleteConfirm" && selectedSong && (
                <DeleteSong song={selectedSong} onClose={handleCloseBackdrop} />
              )}
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <ToastManager
          toasts={notifications.map((notification) => ({
            id: notification.id.toString(),
            type: notification.type,
            title:
              notification.type.charAt(0).toUpperCase() +
              notification.type.slice(1),
            message: notification.message,
            duration: 5000,
          }))}
          onRemove={handleRemoveToast}
        />
      </div>
    </div>
  );
}
