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
  type FetchSongsParams,
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
  setHasMore,
} from "../state/slices/songsSlice";
import type {
  AddSongPayload,
  Song,
  UpdateSongPayload,
} from "../state/types/songs.types";
// import { setLoading } from "../state/slices/uiSlice";
// import { fetchStatistics } from "../state/slices/statisticsSlice";

// worker sagas
export function* fetchSongsSaga(
  action: PayloadAction<FetchSongsParams>
): SagaIterator<void> {
  try {
    const songs = yield call(fetchSongsRepo, action.payload);
    if (songs.length === 0) yield put(setHasMore(false))
  
    else yield put(setSongs(songs));
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
