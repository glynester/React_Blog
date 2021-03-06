import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  // state: (state = {}) => state   // Dummy reducer
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;

// Our goal here inside this reducer is to return a object that contains the ID of every post as the key, and then the value will be the actual post itself.


// wire in this reducer from Redux form into our combined reducers call.
