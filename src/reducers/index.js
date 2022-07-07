import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  // state: (state = {}) => state   // Dummy reducer
  posts: PostsReducer
});

export default rootReducer;

// Our goal here inside this reducer is to return a object that contains the ID of every post as the key, and then the value will be the actual post itself.
