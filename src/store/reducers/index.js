import {
 combineReducers
} from "redux";
import authReducer from "../reducers/authReducer";
import {
 firestoreReducer
} from "redux-firestore";

import {
 firebaseReducer
} from "react-redux-firebase";

import {
 reducer as formReducer
} from "redux-form";
const reducers = combineReducers({
 firestore: firestoreReducer,
 firebase: firebaseReducer,
 auth: authReducer,
 form: formReducer
});
export default reducers;