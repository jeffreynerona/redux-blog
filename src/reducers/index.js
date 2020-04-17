import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import posts from './postsReducer';
import users from './usersReducer';

export default combineReducers({
  posts,
  users,
  form: formReducer,
});
