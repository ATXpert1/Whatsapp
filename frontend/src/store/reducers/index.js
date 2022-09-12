import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
// Combine reduers
export default combineReducers({
    authReducer,
    appReducer,
});