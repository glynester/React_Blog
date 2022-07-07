import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state={}, action){
  switch (action.type){
    case FETCH_POSTS: 
      console.log("action.payload.data=>",action.payload.data); // Array of posts
      // return _.mapKeys(action.payload.data,'id');  // Not working due to CORS error
      // Below is workaround fudge due to CORS error!!!
      return _.mapKeys(
        [{"id":6,"title":"Summer sunny sun sun","categories":"fun, sun, sea","content":"Surfing the sea (no the internet)"},{"id":5,"title":"Fun day","categories":"fun, tennis, excitement","content":"Exciting stuff!!!"},{"id":4,"title":"hey BB","categories":"fun, dating, sport","content":"What a day! What a night!"}]
        ,'id');
    default:
      return state;
  }
}



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



