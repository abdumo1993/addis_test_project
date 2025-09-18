import type { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchStatisticsRequest,
  setStatError,
  setStatistics,
  type StatisticsData,
} from "../state";
import { fetchStatisticsRepo } from "../api/repos";

// worker sagas
export function* fetchStatsSaga(): SagaIterator {
  try {
    const stats: StatisticsData = yield call(fetchStatisticsRepo);
    yield put(setStatistics(stats));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch statistics";
    yield put(setStatError(errorMessage));
  }
}

// watcher sagas
export function* watchStatsSaga(): SagaIterator {
  yield takeEvery(fetchStatisticsRequest.type, fetchStatsSaga);
}
