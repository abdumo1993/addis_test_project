import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { rootSaga } from "../sagas";

// Import reducers
import songsReducer from "./slices/songsSlice";
import statisticsReducer from "./slices/statisticsSlice";
import filtersReducer from "./slices/filtersSlice";
import uiReducer from "./slices/uiSlice";
import createSagaMiddleware from "redux-saga";

// create middleware
const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    statistics: statisticsReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
