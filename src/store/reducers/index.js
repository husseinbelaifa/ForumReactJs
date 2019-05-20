import {
 combineReducers
} from "redux";
import authReducer from "../reducers/authReducer";
// import {
//  firestoreReducer
// } from "redux-firestore";

import {
 firebaseReducer
} from "react-redux-firebase";

import {
 reducer as formReducer
} from "redux-form";
import {
 userReducer
} from '../reducers/userReducer';

import {
 categoryReducer
} from '../reducers/categoryReducer';

import {
 threadReducer
} from '../reducers/threadReducer';

const reducers = combineReducers({
 // firestore: firestoreReducer,
 firebase: firebaseReducer,
 auth: authReducer,
 form: formReducer,
 user: userReducer,
 categories: categoryReducer,
 thread: threadReducer
});
export default reducers;