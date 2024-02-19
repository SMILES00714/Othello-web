import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from 'redux-thunk';
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
    key: "auth",
    storage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const initialState = {
};

const middleware = [thunk];
// const middleware = [thunk as ThunkMiddleware<AuthState, any>];

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);