import { all, fork } from "redux-saga/effects";
import {
  watchFetchSongs,
  watchAddSong,
  watchDeleteSong,
  watchUpdateSong,
} from "./songSagas";
import { watchStatsSaga } from "./statSagas";

export * from "./songSagas";
export * from "./statSagas";

export function* rootSaga() {
  yield all([
    fork(watchFetchSongs),
    fork(watchAddSong),
    fork(watchUpdateSong),
    fork(watchDeleteSong),
    fork(watchStatsSaga),
  ]);
}
