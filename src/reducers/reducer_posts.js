import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state={}, action){
  switch (action.type){
    case FETCH_POST:
      //  take all the posts that we've already fetched and include them in here - ...state
      // we need to make sure that this object right here contains the ID of this post as a key.
      const post=action.payload.data;
      // const newState= { ...state };
      // newState[post.id] = post;
      // return newState;
      return {...state, [post.id]: post}
    case FETCH_POSTS: 
      console.log("FETCH_POSTS=>action.payload.data=>",action.payload.data); // Array of posts
      // mapKeys makes state an object rather than an array.
      return _.mapKeys(action.payload.data,'id');  // Not working due to CORS error
      // Below is workaround fudge due to CORS error!!!
      // return _.mapKeys(
      //   [{"id":6,"title":"Summer sunny sun sun","categories":"fun, sun, sea","content":"Surfing the sea (no the internet)"},{"id":5,"title":"Fun day","categories":"fun, tennis, excitement","content":"Exciting stuff!!!"},{"id":4,"title":"hey BB","categories":"fun, dating, sport","content":"What a day! What a night!"}]
      //   ,'id');
    case DELETE_POST:
      console.log("DELETE_POSTS=>action.payload.data=>",action.payload.data); // Array of posts
      // Better to update the state with the deleted post than requery after the post.
      // return _.reject(state, post=>post===action.payload); // If we had an array (but we don't - we have an object) we wold use something like this.
      return _.omit(state, action.payload);   // lodash - returns new state object
    default:
      return state;
  }
}

// Much better to use an object as application level state rather than an array.


// const posts = [
//   {id: 4,
//    title: "First post"
//   },
//     {id: 5,
//    title: "Second post"
//   }, 
//     {id: 6,
//    title: "Third post"
//   }
//   ]

  // _.mapKeys(posts, 'id');     // {"4":{"id":4,"title":"First post"},"5":{"id":5,"title":"Second post"},"6":{"id":6,"title":"Third post"}}



