import type { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchStatisticsRequest,
  setStatistics,
  type StatisticsData,
} from "../state";
import { fetchStatisticsRepo } from "../api/repos";

// worker sagas
export function* fetchStatsSaga(): SagaIterator {
  try {
    const stats: StatisticsData = yield call(fetchStatisticsRepo);
    console.log("yielded: ", stats);
    yield put(setStatistics(stats));
  } catch (error: unknown) {
    console.log("failed stat fetch");
    console.log(error);
  }
}

// watcher sagas
export function* watchStatsSaga(): SagaIterator {
  yield takeEvery(fetchStatisticsRequest.type, fetchStatsSaga);
}
