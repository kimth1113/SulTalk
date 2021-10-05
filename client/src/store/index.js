// [리덕스] 새로고침해도 리덕스 스테이트를 유지해주는 index.js 파일

import { createStore } from "redux";
import rootReducer from "../modules";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(enhancedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
