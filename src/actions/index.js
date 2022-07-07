import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=mghasfyp";

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  }
}


// Whenever we are thinking about making network requests inside of an action creator, we have to install Axios to make the actual request and we have to install Redux promise to handle the asynchronous nature of the request itself.

// The Redux promise middleware that we made use of previously will automatically resolve this request for us whenever it sees this action come across. By the time that this action arrives in the reducer, the payload property will contain the response object from Axios, which will have our array of posts.