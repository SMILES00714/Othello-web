import { combineReducers } from "redux";
import auth from "./auth.reducer";
import clients from "./client.reducer";

export default combineReducers({ auth, clients });
