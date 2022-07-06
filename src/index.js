import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

// import App from './components/app';
import PostsIndex from './components/posts_index';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// class Hello extends React.Component {
//   render(){
//     return (
//       <div>Hello!</div>
//     )
//   }
// }

// class Goodbye extends React.Component {
//   render(){
//     return (
//       <div>Goodbye!</div>
//     )
//   }
// }

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Route path="/" component={PostsIndex}/>
      {/* <div>
        <Route path="/hello" component={Hello} />
        <Route path="/goodbye" component={Goodbye} />
      </div> */}
    </BrowserRouter>
    {/* <App /> Now that we have React Router, we don't really have any central single component going on.*/}
  </Provider>
  , document.querySelector('.container'));
