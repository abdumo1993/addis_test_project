import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSongsRepo,
  createSongRepo,
  updateSongRepo,
  deleteSongRepo,
} from "../api/repos";
import {
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongsRequest,
  addSongRequest,
  updateSongRequest,
  deleteSongRequest,
  setSongError,
} from "../state/slices/songsSlice";
import type {
  AddSongPayload,
  Song,
  UpdateSongPayload,
} from "../state/types/songs.types";
// import { setLoading } from "../state/slices/uiSlice";
// import { fetchStatistics } from "../state/slices/statisticsSlice";

// worker sagas
export function* fetchSongsSaga(): SagaIterator<void> {
  try {
    const songs = yield call(fetchSongsRepo);
    console.log("yielded: ", songs);
    yield put(setSongs(songs));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch songs";
    yield put(setSongError(errorMessage));
  }
}

export function* addSongSaga(
  action: PayloadAction<AddSongPayload>
): SagaIterator<void> {
  try {
    const song: Song = yield call(createSongRepo, action.payload);
    yield put(addSong(song));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add song";
    yield put(setSongError(errorMessage));
  }
}
export function* updateSongSaga(
  action: PayloadAction<UpdateSongPayload>
): SagaIterator<void> {
  try {
    const song: Song = yield call(updateSongRepo, action.payload);
    yield put(updateSong(song));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update song";
    yield put(setSongError(errorMessage));
  }
}
export function* deleteSongSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    yield call(deleteSongRepo, action.payload);
    yield put(deleteSong(action.payload));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete song";
    yield put(setSongError(errorMessage));
  }
}

// watcher sagas
export function* watchFetchSongs(): SagaIterator<void> {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
}
export function* watchAddSong(): SagaIterator<void> {
  yield takeLeading(addSongRequest.type, addSongSaga);
}
export function* watchUpdateSong(): SagaIterator<void> {
  yield takeEvery(updateSongRequest.type, updateSongSaga);
}
export function* watchDeleteSong(): SagaIterator<void> {
  yield takeLeading(deleteSongRequest.type, deleteSongSaga);
}

export function* songsRootSaga(): SagaIterator<void> {
  yield all([]);
}
